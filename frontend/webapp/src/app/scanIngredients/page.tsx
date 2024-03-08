'use client';

import React, { useEffect, useRef, useCallback, useState } from "react";
import { set, get, update, del } from 'idb-keyval';
import { Button } from "@/shared/ui";
import Link from "next/link";

const CreateAccountPage = () => {
    return (
        <main className="flex min-h-svh flex-col bg-gradient-to-t from-indigo-300 via-pink-200 p-12">
            <h1 className="text-2xl font-bold">Scan Ingredients</h1>
            <Camera />
        </main>
    );
};

export default CreateAccountPage;

const Camera = () => {
    const [ingredients, setIngredients] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);

    const getUserCamera = async () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 300, facingMode: "environment" }, audio: false })
            .then((stream) => {
                if (!videoRef.current) return
                let video = videoRef.current;
                video.srcObject = stream;
                video.play().catch((err) => console.error("Error playing video:", err));
            })
            .catch((err) => {
                console.error("Error accessing the camera", err);
            });
    }

    const handleTakePhoto = useCallback(() => {
        if (!videoRef.current || !photoRef.current) return;
        const width = 300;
        const height = width / (1 / 1);
        let photo = photoRef.current;
        let video = videoRef.current;
        let ctx = photo.getContext("2d");
        photo.width = width;
        photo.height = height;
        ctx?.drawImage(video, 0, 0, photo.width, photo.height);
        let data = photo.toDataURL("image/png");
        set("ingredients", data);
        setIngredients(true)
        console.log("ingredients created");
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
        del("ingredients");
        setIngredients(false);
        console.log("ingredients cleared");
        if (videoRef.current && photoRef.current) {
            videoRef.current.style.display = 'block';
            photoRef.current.style.display = 'none';
        }
    }, [photoRef]);

    useEffect(() => {
        getUserCamera();
    }, [videoRef]);

    return (
        <div className="flex flex-col relative">
            <div className="py-4"></div>
            <div className="flex justify-center">
                {videoRef && <video
                    playsInline
                    autoPlay
                    className="border-white rounded-full border-8 h-[300px] w-[300px]"
                    ref={videoRef}>
                </video>}
            </div>
            <div className="mx-auto">
                {photoRef && <canvas
                    className="border-white hidden border-8 h-[300px] w-[300px]"
                    ref={photoRef}>
                </canvas>}
            </div>
            <div className="py-12"></div>
            <div className="flex w-full mb-8 justify-evenly">
                {ingredients == false ?
                    (<Button onClick={handleTakePhoto}>Take photo</Button>) :
                    (<Button onClick={handleClearPhoto}>Clear photo</Button>)
                }
                {ingredients == true &&
                    <Button className="w-fit">
                        <Link href="/">
                            Next
                        </Link>
                    </Button>
                }
            </div>
        </div >
    )
}