"use client";

import { formatTime } from "@/lib/youtube";

interface VideoControlsProps {
  visible: boolean;
  playing: boolean;
  muted: boolean;
  volume: number;
  current: number;
  duration: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolume: (v: number) => void;
  onSeek: (t: number) => void;
  fullscreen?: boolean;
  onFullscreen?: () => void;
}

const Play = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>);
const Pause = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>);
const Vol = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z" /></svg>);
const Mut = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z" /><line x1="16" y1="8" x2="22" y2="14" stroke="currentColor" strokeWidth="2" /><line x1="22" y1="8" x2="16" y2="14" stroke="currentColor" strokeWidth="2" /></svg>);

export default function VideoControls({
  visible, playing, muted, volume, current, duration,
  onTogglePlay, onToggleMute, onVolume, onSeek,
  fullscreen, onFullscreen,
}: VideoControlsProps) {
  return (
    <div
      className={`absolute z-20 bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-primary/80 to-transparent transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 text-secondary">
        <button type="button" onClick={onTogglePlay} aria-label={playing ? "Pause video" : "Play video"} className="shrink-0 min-h-11 min-w-11 hover:text-accent transition-colors">
          {playing ? <Pause /> : <Play />}
        </button>

        <span className="text-xs tabular-nums w-10">{formatTime(current)}</span>

        <input
          type="range" min={0} max={duration || 0} step={0.1} value={current}
          aria-label="Video position"
          onChange={(e) => onSeek(Number(e.target.value))}
          className="flex-1 min-w-0 h-1 accent-accent cursor-pointer"
        />

        <span className="text-xs tabular-nums w-10">{formatTime(duration)}</span>

        <button type="button" onClick={onToggleMute} aria-label={muted ? "Unmute video" : "Mute video"} className="shrink-0 min-h-11 hover:text-accent transition-colors">
          {muted || volume === 0 ? <Mut /> : <Vol />}
        </button>

        <input
          type="range" min={0} max={100} value={muted ? 0 : volume}
          aria-label="Volume"
          onChange={(e) => onVolume(Number(e.target.value))}
          className="w-20 h-1 accent-accent cursor-pointer hidden md:block"
        />
        {onFullscreen && <button type="button" onClick={onFullscreen}
          aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="shrink-0 min-h-11 min-w-11 hover:text-accent">⛶</button>}
      </div>
    </div>
  );
}