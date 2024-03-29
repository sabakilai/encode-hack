import React, { useEffect, useRef, useCallback } from "react";
import { set, get, update, del } from 'idb-keyval';
import { createAppStore } from "@/shared/storage/storage";
import { Button } from "@/shared/ui";

interface ICamera {
}

const Camera = ({ }: ICamera) => {
    // const [photo, setPhoto] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    //! STREAMING CAMERA
    const getUserCamera = async () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 300 }, audio: false })
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
        const width = 280;
        const height = width / (1 / 1);
        let photo = photoRef.current;
        let video = videoRef.current;
        let ctx = photo.getContext("2d");
        photo.width = width;
        photo.height = height;
        ctx?.drawImage(video, 0, 0, photo.width, photo.height);
        let data = photo.toDataURL("image/png");
        // setPhoto(data);
        set("selfie", data);
        console.log("selfie created");
    }, [videoRef, photoRef]);
    // }, [videoRef, photoRef, setPhoto]);

    const handleClearPhoto = useCallback(() => {
        if (!photoRef.current) return;
        let photoCurrent = photoRef.current;
        let ctx = photoCurrent?.getContext("2d");
        ctx?.clearRect(0, 0, photoCurrent.width, photoCurrent.height);
        // setPhoto("");
        del("selfie");
        console.log("selfie cleared");
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
                    className="rounded-full border-white border-8 h-[300px] w-[300px]"
                    ref={videoRef}>
                </video>}
            </div>
            <div className="py-4"></div>
            <div className="mx-auto">
                {photoRef && <canvas
                    className="rounded-3xl border-white border-8 h-[280px] w-[280px]"
                    ref={photoRef}>
                </canvas>}
            </div>
            <div className="py-12"></div>
            <div className="flex w-full mb-8 justify-evenly">
                <Button onClick={handleTakePhoto}>Take photo</Button>
                <Button onClick={handleClearPhoto}>Clear photo</Button>
            </div>
        </div >
    )
}

export { Camera }