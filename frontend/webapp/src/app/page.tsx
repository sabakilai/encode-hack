"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { Emoji, Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, ScrollArea } from "@/shared/ui";
import { IoEnter } from "react-icons/io5";


export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-evenly p-6 relative overflow-hidden antialiased">
      <div className="space-y-16 h-full z-0">
        {/* <div className="space-y-4"></div> */}
        <h1 className="text-right text-7xl font-bold">
          FC
          <br />
          APP
        </h1>
        <p className="text-center font-mono text-3xl font-thin">
          <span className="underline">A simple way to</span>
          <br />
          keep track your food
          <br />
          and make sure
          <br />
          about sexy future
        </p>
      </div>
      <LearnMore />
      <div className="h-full">

        <Button size="lg_icon">
          <Link href="/createAccount">
            <IoEnter size={60} />
          </Link>
        </Button>
        {/* <div className="space-y-4"></div> */}
      </div>
    </main>
  );
}


const LearnMore = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="uppercase font-mono">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <ScrollArea className="h-[80svh] w-[80svw]">
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </ScrollArea>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};