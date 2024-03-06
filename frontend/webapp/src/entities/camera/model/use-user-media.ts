import { useState, useEffect } from "react";
import { CaptureOptionsType } from "@/shared/types/basic";

export function useUserMedia(requestedMedia: CaptureOptionsType) {
    const [mediaStream, setMediaStream] = useState(null as MediaStream | null);

    useEffect(() => {
        async function enableVideoStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(
                    requestedMedia
                );
                setMediaStream(stream);
            } catch (err) {
                // Handle the error
            }
        }

        if (!mediaStream) {
            enableVideoStream();
        } else {
            return function cleanup() {
                mediaStream.getTracks().forEach(track => {
                    track.stop();
                });
            };
        }
    }, [mediaStream, requestedMedia]);

    return mediaStream;
}
