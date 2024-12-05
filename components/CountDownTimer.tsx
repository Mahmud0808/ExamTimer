"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Timer from "./Timer";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/lib/utility/methods";

const CountdownTimer = () => {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load data from local storage
  useEffect(() => {
    const savedIsActive = getFromLocalStorage("isActive");
    const savedIsPaused = getFromLocalStorage("isPaused");
    const savedTimeLeft = getFromLocalStorage("timeLeft");
    const savedDuration = getFromLocalStorage("duration");

    if (savedIsActive !== null) setIsActive(savedIsActive);
    if (savedIsPaused !== null) setIsPaused(savedIsPaused);
    if (savedDuration !== null) setDuration(savedDuration);

    // Load initial time if timer is paused
    if (savedTimeLeft !== null) setTimeLeft(savedTimeLeft);
  }, []);

  // Save data to local storage
  useEffect(() => {
    saveToLocalStorage("isActive", isActive);
    saveToLocalStorage("isPaused", isPaused);
    saveToLocalStorage("timeLeft", timeLeft);
  }, [isActive, isPaused, timeLeft]);

  // Set duration
  const handleSetDuration = (): void => {
    if (!isActive && typeof duration === "number" && duration >= 0) {
      setIsActive(false);
      setIsPaused(false);
      setTimeLeft(typeof duration === "number" ? duration * 60 : 0);

      saveToLocalStorage("duration", duration);
      removeFromLocalStorage("startTime");

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Start timer
  const handleStart = (): void => {
    if (timeLeft > 0) {
      if (!isActive && !isPaused) {
        const startTime = new Date().getTime();
        saveToLocalStorage("startTime", startTime);
      }

      if (isPaused) {
        const currentTime = new Date().getTime();
        const startTime = getFromLocalStorage("startTime") as number;
        const pauseTime = getFromLocalStorage("pauseTime") || currentTime;
        const elapsedTime = currentTime - pauseTime;
        saveToLocalStorage("startTime", startTime + elapsedTime);
      }

      setIsActive(true);
      setIsPaused(false);
    }
  };

  // Pause timer
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);

      const currentTime = new Date().getTime();
      saveToLocalStorage("pauseTime", currentTime);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Reset timer
  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration * 60 : 0);

    removeFromLocalStorage("startTime");
    removeFromLocalStorage("pauseTime");

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Calculate remaining time
  const calculateRemainingTime = () => {
    const currentTime = new Date().getTime();
    const startTime = getFromLocalStorage("startTime");
    const duration = getFromLocalStorage("duration");
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    return typeof duration === "number" ? duration * 60 - elapsedTime : 0;
  };

  // Update timer
  useEffect(() => {
    // Load initial time if timer is running
    if (isActive && !isPaused) {
      const initialTimeLeft = calculateRemainingTime();
      setTimeLeft(initialTimeLeft);
    }

    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        const newTimeLeft = calculateRemainingTime();

        if (newTimeLeft <= 0) {
          setIsActive(false);
          setIsPaused(false);

          removeFromLocalStorage("startTime");
          removeFromLocalStorage("pauseTime");

          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        }

        setTimeLeft(newTimeLeft);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    if (!isActive) {
      if (value === "") {
        setDuration("");
      } else {
        const numberValue = Number(value);
        setDuration(numberValue >= 0 ? numberValue : 0);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-screen min-h-screen py-12 xl:py-36">
      <div className="text-animation">
        <div className="text-wrapper">
          <h2>Exam Timer</h2>
          <h2>Exam Timer</h2>
        </div>
      </div>
      <div className="flex items-center">
        <Input
          type="number"
          id="duration"
          placeholder="Duration in minutes"
          value={duration}
          onChange={handleDurationChange}
          className="mr-3 rounded-md bg-white"
          disabled={isActive}
        />
        <Button
          onClick={handleSetDuration}
          disabled={isActive}
          className="select-none"
        >
          Set
        </Button>
      </div>
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        <Timer time={timeLeft} />
      </div>
      <div className="flex justify-center gap-4">
        {!isActive && (
          <Button
            onClick={handleStart}
            variant="outline"
            className="select-none"
          >
            {isPaused ? (
              <img src="/resume.svg" className="h-5 w-5" alt="" />
            ) : (
              <img src="/start.svg" className="h-5 w-5" alt="" />
            )}
            {isPaused ? "Resume" : "Start"}
          </Button>
        )}
        {isActive && !isPaused && (
          <Button
            onClick={handlePause}
            variant="outline"
            className="select-none"
          >
            <img src="/pause.svg" className="h-5 w-5" alt="" />
            Pause
          </Button>
        )}
        {(isActive || isPaused) && (
          <Button
            onClick={handleReset}
            variant="destructive"
            className="select-none"
          >
            <img src="/reset.svg" className="h-5 w-5" alt="" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
