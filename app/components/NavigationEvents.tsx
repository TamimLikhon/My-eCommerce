// app/components/NavigationEvents.tsx
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "./LoadingContext";

export function NavigationEvents() {
  const pathname = usePathname();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    window.addEventListener("beforeunload", handleStart);
    window.addEventListener("load", handleStop);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("load", handleStop);
    };
  }, [setIsLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, setIsLoading]);

  return null;
}
