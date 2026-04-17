'use client'

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type PublicImageProps = ImageProps & {
    wrapperClassName?: string;
    /**
     * Logos / marks on white: no tinted plate behind the image.
     * Loading state is only the centered spinner overlay.
     */
    plain?: boolean;
};

function Spinner({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/5",
                className
            )}
            aria-hidden
        >
            <svg
                className="h-5 w-5 animate-spin text-mainRojo-100"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-80"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    );
}

export default function PublicImage({
    wrapperClassName,
    plain,
    className,
    onLoad,
    onError,
    alt,
    ...props
}: PublicImageProps) {
    const isFill = Boolean(props.fill);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        setHasError(false);
    }, [props.src]);

    return (
        <div
            className={cn(
                "relative overflow-hidden bg-transparent",
                // `next/image` with `fill` is absolutely positioned; this wrapper must
                // fill the sized parent or the box collapses (e.g. category tiles on home).
                isFill && "absolute inset-0 h-full w-full min-h-0",
                wrapperClassName
            )}
        >
            {!isLoaded && !hasError && (
                <div
                    className={cn(
                        "absolute inset-0 z-[1] flex items-center justify-center",
                        plain ? "bg-transparent" : "bg-white/50"
                    )}
                >
                    <Spinner className={plain ? "h-7 w-7" : undefined} />
                </div>
            )}

            {hasError ? (
                <div className="absolute inset-0 z-[1] flex items-center justify-center bg-white/70 text-[10px] text-gray-500">
                    Sin imagen
                </div>
            ) : (
                <Image
                    {...props}
                    alt={alt}
                    className={cn(
                        className,
                        isLoaded ? "opacity-100" : "opacity-0",
                        "transition-opacity duration-300"
                    )}
                    onLoad={(event) => {
                        setIsLoaded(true);
                        onLoad?.(event);
                    }}
                    onError={(event) => {
                        setHasError(true);
                        onError?.(event);
                    }}
                />
            )}
        </div>
    );
}
