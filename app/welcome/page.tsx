"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function WelcomePage() {
  const router = useRouter();
  const [done, setDone] = useState(false);

  // Auto-navigate to /about after the splash
  useEffect(() => {
    const total = 2200; // ms
    const t = setTimeout(() => {
      setDone(true);
      router.push("/about");
    }, total);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="fixed inset-0 grid place-items-center bg-black text-white">
      <AnimatePresence>
        {!done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="relative select-none"
          >
            {/* Netflix-style grow-in wordmark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, filter: "blur(10px)" }}
              animate={{
                scale: [0.6, 1.12, 1],
                opacity: [0, 1, 1],
                filter: ["blur(10px)", "blur(0px)", "blur(0px)"],
              }}
              transition={{ duration: 1.4, times: [0, 0.7, 1], ease: [0.2, 0.8, 0.2, 1] }}
              className="relative text-5xl font-extrabold tracking-[0.08em] text-red-600 sm:text-7xl"
            >
              WELCOME
              {/* red glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-red-700/25 blur-3xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

