"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { get } from 'idb-keyval';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea
} from "@/shared/ui";
import { IoEnter } from "react-icons/io5";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Проверяем, загружен ли файл (например, в localStorage)
    get('selfie').then((data) => {
      if (data) {
        router.push('/scanIngredients');
      }
    });
  }, [router]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-evenly p-6 relative overflow-hidden ">
      <div className="space-y-16 h-full z-0">
        <h1 className="text-right text-[2.4rem] font-bold text-pretty">
          Hi - I'm UPF Checker
        </h1>
        <div>
          <span className="underline text-xl ">Here's how it works:</span>
          <p className="text-pretty font-mono font-thin px-4 uppercase antialiased">
            <br />
            1. Capture a selfie of your beautiful self ✨
            <br />
            2. Snap a photo of the ingredients label on your favorite snack 🍔
            <br />
            3. Let our AI transform your selfie showing the impact of your food choice 🚀
          </p>
        </div>
      </div>
      <LearnMore />
      <div className="h-full">

        <Button size="lg_icon">
          <Link href="/createAccount">
            <IoEnter size={60} />
          </Link>
        </Button>
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
          <DialogTitle>What is UPF?</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <ScrollArea className="h-fit w-fit">
            In the new "age of eating," most of our calories come from an entirely novel set of substances: Ultra-Processed Foods (UPFs).
            <br /><br />
            These industrially processed marvels are designed to be irresistible and easy to overindulge in, leading to not-so-fun consequences like addiction and overconsumption.
            <br /><br />
            UPFs are everywhere, from your favorite ready-to-eat meals to those snack packs you can't put down, packed with sugars, salts, unhealthy fats, and additives.
            But why does this matter? Recent studies have linked UPFs to a host of health issues, including obesity, cardiovascular diseases, and even some cancers.
            <br /><br />
            Yikes!
          </ScrollArea>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};