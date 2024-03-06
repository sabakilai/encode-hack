"use client";

import Link from "next/link";

import { Button } from "@/shared/ui";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-between bg-gradient-to-t from-indigo-300 via-pink-200 p-12">
      <div className="space-y-16">
        <p className="w-full text-2xl">Welcome to the</p>
        <h1 className="text-right text-7xl font-bold  text-pink-400">
          Food
          <br />
          Checker
        </h1>
        <p className="text-center font-sans text-4xl font-thin">
          A simple way to
          <br />
          keep track your food
          <br />
          and make sure
          <br />
          about sexy future
        </p>
      </div>
      <Link href="/createAccount">
        <Button size="lg" className="text-xl uppercase">
          dive in
        </Button>
      </Link>
    </main>
  );
}
