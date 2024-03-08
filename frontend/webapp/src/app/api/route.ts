import { type Base64 } from "@/shared/types/basic";

export async function POST(selfie: Base64, ingredients: Base64) {
    console.log("selfie", selfie);
    console.log("ingredients", ingredients);
    const res = await fetch('http://127.0.0.1:5000/userInput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_photo: selfie, ingredients_photo: ingredients }),
    });
    const data: string = await res.json()
    return Response.json(data);
}
