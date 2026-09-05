// Explicit exported types for the YouTube iframe API surface we use.
export type YTPlayer = {
  getDuration: () => number;
  getCurrentTime: () => number;
  setVolume: (v: number) => void;
  mute: () => void;
  unMute: () => void;
  pauseVideo: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  destroy?: () => void;
};

export type YTPlayerEvent = {
  target: YTPlayer;
  data?: number;
};

export const YTPlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

export type YTGlobal = {
  Player: new (elementId: string | HTMLElement, options?: unknown) => YTPlayer;
  PlayerState: typeof YTPlayerState;
};

declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!["https:", "http:"].includes(parsed.protocol)) return null;
    const host = parsed.hostname.replace(/^www\./, "");
    const id = host === "youtu.be" ? parsed.pathname.slice(1) :
      ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
        ? parsed.searchParams.get("v") || parsed.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)\/?$/)?.[1] : null;
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

let apiPromise: Promise<Window["YT"] | undefined> | null = null;

export function loadYouTubeAPI(): Promise<Window["YT"] | undefined> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      // window.YT will be available once the API is ready
      resolve(window.YT);
    };
  });
  return apiPromise;
}

export function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function getYouTubeAspect(presentation?: { width: number; height: number; source: string; videoLink: string } | null, videoLink?: string): number | undefined {
  if (!presentation || presentation.source !== "admin" || presentation.videoLink !== videoLink ||
    !Number.isFinite(presentation.width) || !Number.isFinite(presentation.height) ||
    presentation.width <= 0 || presentation.height <= 0) return undefined;
  return presentation.width / presentation.height;
}