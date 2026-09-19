'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const PLAYLIST = [
  '/audio/track-1.mp3',
  '/audio/track-2.mp3',
  '/audio/track-3.mp3',
];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
  }, [trackIndex]);

  function handleEnded() {
    setTrackIndex(prev => (prev + 1) % PLAYLIST.length);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={PLAYLIST[trackIndex]}
        muted={muted}
        autoPlay
        preload="auto"
        onEnded={handleEnded}
      />
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition hover:bg-card"
      >
        {muted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4 text-brand" />
        )}
      </button>
    </>
  );
}
