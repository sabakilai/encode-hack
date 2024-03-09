'use client';

import React, { useEffect, useRef, useCallback, useState } from "react";
import { set, get, update, del } from 'idb-keyval';
import { Button } from "@/shared/ui";
import Link from "next/link";

import { Base64 } from "@/shared/types/basic";

import { IoCameraOutline, IoCheckmarkDoneCircleOutline, IoRefreshCircleOutline } from "react-icons/io5";
import { env } from "process";

const CreateAccountPage = () => {
    return (
        <main className="flex min-h-svh flex-col p-6">
            <h1 className="text-2xl uppercase text-right">scan ingredients</h1>
            <div className="py-4"></div>
            <Camera />
        </main>
    );
};

export default CreateAccountPage;

const Camera = () => {
    const [selfie, setSelfie] = useState<Base64>("");
    const [ingredients, setIngredients] = useState<Base64>("");
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
        set("ingredients", data).then(() => console.log("ingredients created"));
        get("selfie").then((data: Base64) => setSelfie(data));
        setIngredients(data)
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
        del("ingredients").then(() => console.log("ingredients cleared"));
        setIngredients("");
        if (videoRef.current && photoRef.current) {
            videoRef.current.style.display = 'block';
            photoRef.current.style.display = 'none';
        }
    }, [photoRef]);

    useEffect(() => {
        getUserCamera();
    }, [videoRef]);



    const fetchIngredients = async () => {
        const res = await fetch('http://127.0.0.1:5000/userInput', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': process.env.AUTHENTICATION_TOKEN!,
            },
            body: JSON.stringify({ user_photo: selfie, ingredients_photo: ingredients }),
        });
        const data = await res.json();
        set("response", data);
    }

    return (
        <div className="flex flex-col relative justify-evenly my-auto">
            <div className="flex justify-center">
                {videoRef && <video
                    playsInline
                    autoPlay
                    className="border-black rounded-lg border-8 aspect-square w-[340px]"
                    ref={videoRef}>
                </video>}
            </div>
            <div className="mx-auto">
                {photoRef && <canvas
                    className="border-black hidden rounded-lg border-8 aspect-square w-[340px]"
                    ref={photoRef}>
                </canvas>}
            </div>
            <div className="py-4"></div>
            <div className="flex w-full mb-8 justify-evenly">
                {ingredients == "" ?
                    (<Button size="lg_icon" variant="secondary" onClick={handleTakePhoto}><IoCameraOutline size={60} /></Button>) :
                    (<Button size="lg_icon" variant="destructive" onClick={handleClearPhoto}><IoRefreshCircleOutline size={60} /></Button>)
                }
                {ingredients != "" &&
                    <Button size="lg_icon">
                        <Link href="/result" onClick={() => fetchIngredients()}>
                            <IoCheckmarkDoneCircleOutline size={60} />
                        </Link>
                    </Button>
                }
            </div>
            <div className="py-12"></div>
        </div >
    )
}