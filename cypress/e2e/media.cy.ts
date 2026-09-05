function visitMedia(hover = true, fullscreen = true) {
  cy.intercept("GET", "/__media_test_clip.mp4", { statusCode: 200, body: "", headers: { "content-type": "video/mp4" } });
  cy.intercept("GET", "https://media.example.test/legacy.mp4", { statusCode: 200, body: "", headers: { "content-type": "video/mp4" } });
  cy.visit("/media-test-fixture", {
    onBeforeLoad(win) {
      const nativeMatch = win.matchMedia.bind(win);
      cy.stub(win, "matchMedia").callsFake((query: string) => query.includes("hover") ?
        { matches: hover, addEventListener() {}, removeEventListener() {} } : nativeMatch(query));
      cy.stub(win.HTMLMediaElement.prototype, "play").callsFake(() => Promise.resolve()).as("play");
      cy.stub(win.HTMLMediaElement.prototype, "pause").as("pause");
      Object.defineProperty(win.document, "fullscreenEnabled", { configurable: true, value: fullscreen });
      if (fullscreen) {
        cy.stub(win.HTMLElement.prototype, "requestFullscreen").callsFake(function (this: HTMLElement) {
          Object.defineProperty(win.document, "fullscreenElement", { configurable: true, value: this });
          win.document.dispatchEvent(new Event("fullscreenchange")); return Promise.resolve();
        });
        cy.stub(win.document, "exitFullscreen").callsFake(() => {
          Object.defineProperty(win.document, "fullscreenElement", { configurable: true, value: null });
          win.document.dispatchEvent(new Event("fullscreenchange")); return Promise.resolve();
        });
      }
      win.YT = {
        PlayerState: { UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 },
        Player: class {
          frame: HTMLIFrameElement;
          constructor(element: string | HTMLElement, options?: unknown) {
            const host = typeof element === "string" ? win.document.getElementById(element)! : element;
            this.frame = win.document.createElement("iframe");
            this.frame.title = "YouTube test player";
            this.frame.dataset.nativeControls = String((options as { playerVars: { controls: number } }).playerVars.controls);
            this.frame.allowFullscreen = true;
            host.replaceWith(this.frame);
          }
          getDuration() { return 60; } getCurrentTime() { return 0; }
          setVolume() {} mute() {} unMute() {} pauseVideo() {} playVideo() {} seekTo() {}
          destroy() { this.frame.remove(); }
        },
      };
    },
  });
}

describe("Portfolio media interactions", () => {
  it("renders legacy main video with native controls and intrinsic sizing, never on home", () => {
    visitMedia();
    cy.get('[data-testid="detail-legacy"] .project-player video').should($video => {
      const video = $video[0] as HTMLVideoElement;
      expect(video.src).to.equal("https://media.example.test/legacy.mp4");
      expect(video.controls).to.equal(true);
      expect(video.getAttribute("controlslist") || "").not.to.contain("nofullscreen");
      expect(video.classList.contains("h-auto")).to.equal(true);
      expect(getComputedStyle(video).objectFit).not.to.equal("cover");
      expect(video.hasAttribute("width")).to.equal(false);
      expect(video.hasAttribute("height")).to.equal(false);
    });
    cy.get('[data-testid="detail-legacy"] iframe').should("not.exist");
    cy.get('[data-testid="home"] iframe').should("exist");
    cy.get('[data-testid="home"] video').should("not.exist");
  });
  it("plays only on hover, pauses on exit, and keeps the navigation link", () => {
    visitMedia();
    cy.get("@play").should("not.have.been.called");
    cy.get('[data-testid="preview"] > div').trigger("pointerover", { pointerType: "mouse", eventConstructor: "PointerEvent" });
    cy.get("@play").should("have.been.called");
    cy.get('[data-testid="preview"] > div').trigger("pointerout", { pointerType: "mouse", eventConstructor: "PointerEvent" });
    cy.get("@pause").should("have.been.called");
    cy.get('[data-testid="preview"]').should("have.attr", "href", "#detail");
  });
  it("does not autoplay on touch/no-hover", () => {
    visitMedia(false);
    cy.get('[data-testid="preview"] > div').trigger("pointerover", { pointerType: "touch", eventConstructor: "PointerEvent" });
    cy.get("@play").should("not.have.been.called");
    cy.get('[data-testid="preview"] video').should("not.have.attr", "autoplay");
  });
  it("handles a late play promise after pointer exit and pauses when the tab is hidden", () => {
    visitMedia();
    let finish: () => void;
    cy.window().then(win => {
      win.HTMLMediaElement.prototype.play = () => new Promise<void>(resolve => { finish = resolve; });
    });
    cy.get('[data-testid="preview"] > div').trigger("pointerover", { pointerType: "mouse", eventConstructor: "PointerEvent" });
    cy.get('[data-testid="preview"] > div').trigger("pointerout", { pointerType: "mouse", eventConstructor: "PointerEvent" });
    cy.then(() => finish());
    cy.get('[data-testid="preview"] video').should("have.class", "opacity-0");
    cy.document().then(doc => {
      Object.defineProperty(doc, "hidden", { configurable: true, value: true });
      doc.dispatchEvent(new Event("visibilitychange"));
    });
    cy.get("@pause").should("have.been.called");
  });
  it("preserves all declared ratios with exact, uncropped iframe geometry", () => {
    visitMedia();
    [4 / 3, 1, 9 / 16, 2.39].forEach((aspect, index) => {
      cy.get(`[data-testid="detail-${index}"] .project-player iframe`).then($frame => {
        const frame = $frame[0].getBoundingClientRect();
        expect(frame.width / frame.height).to.be.closeTo(aspect, .02);
        const container = $frame[0].parentElement!.getBoundingClientRect();
        expect(frame.width).to.be.closeTo(container.width, 1);
        expect(frame.height).to.be.closeTo(container.height, 1);
      });
    });
  });
  it("uses desktop columns and preserves mobile order without duplicated media links", () => {
    visitMedia(); cy.viewport(1280, 900);
    cy.get('[data-testid="detail-0"] .project-layout').should("have.css", "grid-template-areas", '"player sidebar" "heading sidebar" "description sidebar"');
    cy.get('[data-testid="detail-0"] .project-media-link').should("have.length", 1);
    cy.get('[data-testid="detail-0"] .project-credits').scrollIntoView().find("h3").should("have.css", "opacity", "1");
    cy.screenshot("media-desktop", { capture: "viewport" });
    cy.viewport(390, 844);
    cy.get('[data-testid="detail-0"] .project-layout').should("have.css", "grid-template-areas", '"heading" "player" "description" "sidebar"');
    cy.document().then(doc => expect(doc.documentElement.scrollWidth).to.be.at.most(390));
    cy.get('[data-testid="detail-0"] .project-heading').scrollIntoView();
    cy.screenshot("media-mobile", { capture: "viewport" });
  });
  it("toggles container fullscreen and uses native controls when unavailable", () => {
    visitMedia();
    cy.get('[data-testid="detail-0"] button[aria-label="Enter fullscreen"]').click();
    cy.get('[data-testid="detail-0"] button[aria-label="Exit fullscreen"]').click();
    cy.get('[data-testid="detail-0"] button[aria-label="Enter fullscreen"]').should("exist");
    visitMedia(true, false);
    cy.get('[data-testid="detail-0"] iframe').should("have.attr", "data-native-controls", "1");
    cy.get('[data-testid="detail-0"] button[aria-label="Enter fullscreen"]').should("not.exist");
  });
  it("renders original animated GIFs and native non-autoplay MP4 controls", () => {
    visitMedia();
    cy.get('[data-testid="detail-0"] img[alt="Two-frame animated GIF"]')
      .should("have.attr", "src").and("include", "data:image/gif;base64,");
    cy.get('[data-testid="detail-0"] video').should($video => {
      expect($video).to.have.attr("controls"); expect($video).to.have.attr("playsinline");
      expect($video).not.to.have.attr("autoplay");
    });
  });
  it("shows validation errors for invalid files", () => {
    visitMedia();
    cy.get('[data-testid="upload"] input[type="file"]').selectFile({
      contents: Cypress.Buffer.from("<svg/>"), fileName: "invalid.svg", mimeType: "image/svg+xml",
    }, { force: true });
    cy.get('[data-testid="upload"] [role="alert"]').should("contain", "Use JPEG, PNG, WebP, GIF or MP4");
  });
});
