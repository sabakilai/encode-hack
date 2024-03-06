type Base64 = string;

type CaptureOptionsType = {
    audio: boolean;
    video: {
        facingMode: "user" | "environment";
    };
}

export { type Base64, type CaptureOptionsType }