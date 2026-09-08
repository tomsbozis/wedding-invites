"use client";
import { useRef, useState } from "react";

export default function SongPlayer({ audioUrl }: { audioUrl: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  }

  return (
    <div className="flex justify-center my-4">
      <audio ref={audioRef} src={audioUrl} loop />
      <button
        onClick={toggle}
        className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm"
      >
        {playing ? "⏸ Pauzēt mūziku" : "▶ Atskaņot mūsu dziesmu"}
      </button>
    </div>
  );
}