import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-8 py-4 px-6 bg-white/80 backdrop-blur-sm rounded-xl border border-[#008080]/10">
      <div className="flex items-center space-x-2 text-[#008080]">
        <Timer className="h-5 w-5" />
        <span className="text-sm font-medium">Launch Countdown</span>
      </div>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-2xl font-bold text-[#008080]">{value}</div>
          <div className="text-xs text-gray-600 capitalize">{unit}</div>
        </div>
      ))}
    </div>
  );
}