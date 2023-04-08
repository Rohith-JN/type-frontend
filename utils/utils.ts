import { ToastOptions } from "react-toastify";

export function secondsToTime(e: number) {
    const m = Math.floor((e % 3600) / 60)
            .toString()
            .padStart(2, "0"),
        s = Math.floor(e % 60)
            .toString()
            .padStart(2, "0");

    return m + ":" + s;
}

export const toastOptions: ToastOptions<{}> | undefined = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
};

export const Options: string[] = [
    "superuser",
    "pink",
    "aether",
    "alduin",
    "arch",
    "aurora",
    "bushido",
    "carbon",
    "dark",
    "dev",
    "drowning",
    "gruvbox",
    "matrix",
    "metaverse",
    "miami",
    "mountain",
    "nord",
    "paper",
    "pulse",
    "scalene",
    "shadow",
    "stealth",
    "viridescent",
    "vscode",
    "weird",
].sort();

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}
