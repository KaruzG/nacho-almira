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
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return m ? m[1] : null;
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

export function getYouTubeAspect(url?: string): number {
  if (url && /youtube\.com\/shorts\//.test(url)) return 9 / 16;
  return 16 / 9;
}