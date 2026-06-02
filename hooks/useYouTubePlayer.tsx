import { useCallback, useEffect, useRef, useState } from "react";
import { loadYouTubeAPI } from "@/lib/youtube";

export function useYouTubePlayer({
  videoId,
  loop = true,
}: {
  videoId: string;
  loop?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(100);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let destroyed = false;

    loadYouTubeAPI().then((YT) => {
      if (destroyed || !hostRef.current) return;

      playerRef.current = new YT.Player(hostRef.current, {
        width: "100%",
        height: "100%",
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: any) => {
            setDuration(e.target.getDuration());
            e.target.setVolume(volume);
            intervalRef.current = setInterval(() => {
              const p = playerRef.current;
              if (!p?.getCurrentTime) return;
              const cur = p.getCurrentTime();
              const dur = p.getDuration();
              setCurrent(cur);
              if (dur) setDuration(dur);
              // Reinicia ANTES del final -> nunca llega a mostrarse
              // la pantalla de "canal + vídeo recomendado"
              if (loop && dur && cur >= dur - 6.2) p.seekTo(0, true);
            }, 200);
          },
          onStateChange: (e: any) => {
            setPlaying(e.data === YT.PlayerState.PLAYING);
            if (loop && e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(0, true);
              e.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      destroyed = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, loop]);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    playing ? p.pauseVideo() : p.playVideo();
  }, [playing]);

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
      if (volume === 0) {
        p.setVolume(100);
        setVolume(100);
      }
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  }, [muted, volume]);

  const changeVolume = useCallback(
    (v: number) => {
      const p = playerRef.current;
      if (!p) return;
      p.setVolume(v);
      setVolume(v);
      if (v === 0) {
        p.mute();
        setMuted(true);
      } else if (muted) {
        p.unMute();
        setMuted(false);
      }
    },
    [muted]
  );

  const seek = useCallback((t: number) => {
    playerRef.current?.seekTo(t, true);
    setCurrent(t);
  }, []);

  return {
    hostRef,
    state: { playing, muted, volume, current, duration },
    actions: { togglePlay, toggleMute, changeVolume, seek },
  };
}