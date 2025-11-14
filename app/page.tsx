"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const r = useRouter();
  useEffect(() => {
    r.replace("/welcome");
  }, [r]);

  return (
    <main className="grid min-h-svh place-items-center bg-black text-zinc-400">
      Loading…
    </main>
  );
}
