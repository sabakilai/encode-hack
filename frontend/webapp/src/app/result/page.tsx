"use client";

import { useEffect, useRef, useState } from 'react';
import { get } from 'idb-keyval';

const ResultPage = () => {
    const [selfie, setSelfie] = useState<string>("");
    console.log(selfie);
    const photoRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        get("selfie").then((data) => {
            setSelfie(data);
        }).finally(() => {
            if (!selfie) return;
            const photo = photoRef.current;
            if (!photo) return; // Add this line to check if photo is not null
            const ctx = photo.getContext("2d");
            const image = new Image();
            image.src = selfie;
            image.onload = () => {
                photo.width = 300;
                photo.height = 300;
                if (ctx) { // Check if ctx is not null before calling drawImage
                    ctx.drawImage(image, 0, 0, photo.width, photo.height);
                }
            }
            if (photoRef.current) photoRef.current.style.display = 'block';
        });
    }, [selfie, photoRef]);



    return (
        <main className="flex min-h-svh flex-col bg-gradient-to-t from-indigo-300 via-pink-200 p-12">
            <h1 className="text-2xl font-bold">Result</h1>
            <div>
                <div className="mx-auto">
                    {photoRef && <canvas
                        className="border-white hidden border-8 aspect-square w-[300px]"
                        ref={photoRef}>
                    </canvas>}
                </div>
            </div>
        </main>
    );
};

export default ResultPage;