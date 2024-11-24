"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Timer from "./Timer";

const CountdownTimer = () => {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration * 60);
      setIsActive(false);
      setIsPaused(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration * 60 : 0);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }

          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
        Exam Timer
      </h1>
      <div className="flex items-center">
        <Input
          type="number"
          id="duration"
          placeholder="Enter duration in minutes"
          value={duration}
          onChange={handleDurationChange}
          className="flex-1 mr-4 rounded-md bg-white border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        />
        <Button
          onClick={handleSetDuration}
          variant="outline"
          className="text-gray-800 dark:text-gray-200"
        >
          Set
        </Button>
      </div>
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        <Timer time={timeLeft} />
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleStart}
          variant="outline"
          className="text-gray-800 dark:text-gray-200"
        >
          {isPaused ? "Resume" : "Start"}
        </Button>
        {!isPaused && (
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </Button>
        )}
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-gray-800 dark:text-gray-200"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
