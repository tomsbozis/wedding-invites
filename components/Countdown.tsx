"use client";
import { useEffect, useState } from "react";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    function update() {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  const units = [
    { label: "dienas", value: timeLeft.days },
    { label: "stundas", value: timeLeft.hours },
    { label: "minūtes", value: timeLeft.minutes },
    { label: "sekundes", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-2 my-6">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="w-14 h-14 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-lg font-medium">
            {u.value}
          </div>
          <p className="text-[10px] text-neutral-500 mt-1 uppercase">{u.label}</p>
        </div>
      ))}
    </div>
  );
}