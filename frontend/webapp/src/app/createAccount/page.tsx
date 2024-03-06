'use client';

import { useState } from "react";

import { Button } from "@/shared/ui";
import { Camera } from "@/entities/camera";

const CreateAccountPage = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();

  return (
    <main className="flex min-h-svh flex-col bg-gradient-to-t from-indigo-300 via-pink-200 p-12">
      <h1 className="text-2xl font-bold">Create Account</h1>
      <Camera />
    </main>
  );
};

export default CreateAccountPage;
