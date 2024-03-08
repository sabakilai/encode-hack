import { type Base64 } from "@/shared/types/basic";
import { set } from "idb-keyval";

export async function POST(selfie: Base64, ingredients: Base64) {
    const res = await fetch('http://127.0.0.1:5000/userInput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_photo: selfie, ingredients_photo: ingredients }),
    });
    const data = await res.text();
    set("response", data);
    return Response.json(data);
}

