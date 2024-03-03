"use client";

import Link from "next/link";

import { Button } from "@/shared/ui";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-between bg-gradient-to-t from-indigo-300 via-pink-200 p-12">
      <h1 className="w-full text-6xl font-bold">
        Welcome to the
        <br />
        <span className="text-pink-400">
          Food
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Checker
        </span>
        <br />
        <p className="rotate-180">App</p>
      </h1>
      <Link href="/createAccount">
        <Button size="lg">
          <span className="text-xl font-bold uppercase">
            start your journey
          </span>
        </Button>
      </Link>
    </main>
  );
}
