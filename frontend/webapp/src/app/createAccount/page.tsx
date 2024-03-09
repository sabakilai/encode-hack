'use client';

import React, { useEffect, useRef, useCallback, useState } from "react";
import { set, del } from 'idb-keyval';
import { Button } from "@/shared/ui";
import Link from "next/link";

import {
  IoCameraOutline,
  IoRefreshCircleOutline,
  IoCheckmarkDoneCircleOutline
} from "react-icons/io5";


const CreateAccountPage = () => {
  return (
    <main className="flex flex-col min-h-svh p-6">
      <h1 className="text-2xl uppercase text-right">create account</h1>
      <div className="py-4"></div>
      <Camera />
    </main>
  );
};

export default CreateAccountPage;

const Camera = () => {
  const [selfie, setSelfie] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);

  const getUserCamera = async () => {
    const width = 512;
    const height = width;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width, height, facingMode: "user" }, audio: false });
      if (!videoRef.current) return;
      let video = videoRef.current;
      video.srcObject = stream;
      video.play().catch((err) => console.error("Error playing video:", err));
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  }

  const handleTakePhoto = useCallback(() => {
    if (!videoRef.current || !photoRef.current) return;
    const width = 512;
    const height = width / (1 / 1);
    let photo = photoRef.current;
    let video = videoRef.current;
    let ctx = photo.getContext("2d");
    photo.width = width;
    photo.height = height;
    ctx?.drawImage(video, 0, 0, photo.width, photo.height);
    let data = photo.toDataURL("image/png");
    set("selfie", data).then(() => console.log("selfie created"));
    setSelfie(true)
    if (videoRef.current && photoRef.current) {
      videoRef.current.style.display = 'none';
      photoRef.current.style.display = 'block';
    }
  }, [videoRef, photoRef]);

  const handleClearPhoto = useCallback(() => {
    if (!photoRef.current) return;
    let photoCurrent = photoRef.current;
    let ctx = photoCurrent?.getContext("2d");
    ctx?.clearRect(0, 0, photoCurrent.width, photoCurrent.height);
    del("selfie").then(() => console.log("selfie cleared"));
    setSelfie(false);
    if (videoRef.current && photoRef.current) {
      videoRef.current.style.display = 'block';
      photoRef.current.style.display = 'none';
    }
  }, [photoRef]);

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  return (
    <div className="flex flex-col relative justify-evenly my-auto">
      <div className="flex justify-center z-0">
        {videoRef && <video
          playsInline
          autoPlay
          className="border-black rounded-lg border-8"
          ref={videoRef}>
        </video>}
      </div>
      <div className="mx-auto">
        {photoRef && <canvas
          className="border-black hidden rounded-lg border-8 aspect-square"
          ref={photoRef}>
        </canvas>}
      </div>
      <div className="py-4"></div>
      <div className="flex w-full mb-8 justify-evenly">
        {selfie == false ?
          (<Button size="lg_icon" variant="secondary" onClick={handleTakePhoto}><IoCameraOutline size={60} /></Button>) :
          (<Button size="lg_icon" variant="destructive" onClick={handleClearPhoto}><IoRefreshCircleOutline size={60} /></Button>)
        }
        {selfie == true &&
          <Button size="lg_icon">
            <Link href="/scanIngredients">
              <IoCheckmarkDoneCircleOutline size={60} />
            </Link>
          </Button>
        }
      </div>
      <div className="py-12"></div>
    </div>
  )
}