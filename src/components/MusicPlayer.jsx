'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

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
    audio.muted = muted;
    audio.play().catch(() => {});
  }, [trackIndex, muted]);

  function handleEnded() {
    setTrackIndex(prev => (prev + 1) % PLAYLIST.length);
  }

  function goNext() {
    setTrackIndex(prev => (prev + 1) % PLAYLIST.length);
  }

  function goPrev() {
    setTrackIndex(prev => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  }

  function toggleMute() {
    setMuted(prev => !prev);
  }

  return (
    <div className="flex items-center gap-1">
      <audio
        ref={audioRef}
        src={PLAYLIST[trackIndex]}
        preload="auto"
        onEnded={handleEnded}
      />

      <button
        onClick={goPrev}
        aria-label="Previous track"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition hover:bg-card"
      >
        <SkipBack className="h-3.5 w-3.5" />
      </button>

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

      <button
        onClick={goNext}
        aria-label="Next track"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition hover:bg-card"
      >
        <SkipForward className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
