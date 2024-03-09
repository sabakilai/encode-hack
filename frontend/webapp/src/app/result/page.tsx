"use client";

import { useEffect, useRef, useState } from 'react';
import { get, getMany } from 'idb-keyval';
import { Base64 } from '@/shared/types/basic';

const ResultPage = () => {
    const [selfie, setSelfie] = useState<Base64>("");
    const [foodCategory, setFoodCategory] = useState<Base64>("");
    const photoRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        getMany(["selfie", "food_category"]).then(([selfie, foodCategory]) => {
            const photo = photoRef.current;
            setSelfie(selfie);
            setFoodCategory(foodCategory);
            if (!photo || !selfie) return;
            const ctx = photo.getContext("2d");
            const image = new Image();
            image.src = selfie;
            image.onload = () => {
                photo.width = 300;
                photo.height = 300;
                if (ctx) ctx.drawImage(image, 0, 0, photo.width, photo.height);
            }
            if (photoRef.current) photoRef.current.style.display = 'block';
        });
    }, [selfie, photoRef, foodCategory]);
    /*
    response = {
        'food_category': food_category,
        'good_counter': good_counter,
        'bad_counter': bad_counter,
        'attempts_counter': attempts_counter,
        'transformed_photo': transformed_photo
    }
    */
    return (
        <main className="flex min-h-svh flex-col p-6">
            <h1 className="text-2xl uppercase text-right">result</h1>
            <div className="py-4"></div>
            <div className='my-auto'>
                {photoRef && <canvas
                    className="border-black hidden border-8 aspect-square m-auto"
                    ref={photoRef}>
                </canvas>}
                <div className="py-4"></div>
                <div className='px-6'>
                    <div>
                        <h2 className='font-mono uppercase'>food category:</h2>
                        <p className="uppercase">{foodCategory}example</p>
                    </div>
                </div>
            </div>
        </main >
    );
};

export default ResultPage;