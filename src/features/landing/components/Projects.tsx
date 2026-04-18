"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import AOS from "aos";

type Category = "peliculas" | "series" | "comerciales" | "rodaje";

// ─── VideoThumbnail ───────────────────────────────────────────────────────────
// Captura el primer frame del video y lo muestra como imagen estática.
// No hay <video> visible ni audio en el grid.

function VideoThumbnail({ src }: { src: string }) {
    const [thumb, setThumb] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = document.createElement("video");
        video.src = src;
        video.muted = true;
        video.playsInline = true;
        video.preload = "metadata";
        video.crossOrigin = "anonymous";

        const capture = () => {
            // Buscar al segundo 0 para asegurar que haya frame
            video.currentTime = 0.001;
        };

        const draw = () => {
            try {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth || 640;
                canvas.height = video.videoHeight || 360;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                setThumb(canvas.toDataURL("image/jpeg", 0.85));
            } catch {
                // Si el video no permite captura (CORS), se queda en null → fondo negro
            }
            video.src = ""; // liberar memoria
        };

        video.addEventListener("loadedmetadata", capture);
        video.addEventListener("seeked", draw);
        video.load();

        return () => {
            video.removeEventListener("loadedmetadata", capture);
            video.removeEventListener("seeked", draw);
            video.src = "";
        };
    }, [src]);

    return (
        <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
            {thumb && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={thumb}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
            {/* Overlay oscuro encima del frame */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-200" />
            {/* Ícono de play centrado */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center shadow-lg
                                transition-transform duration-200 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black ml-0.5">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
    files: string[];
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

function Lightbox({ files, index, onClose, onPrev, onNext }: LightboxProps) {
    const file = files[index];
    const isVideo =
        file.toLowerCase().endsWith(".mp4") ||
        file.toLowerCase().endsWith(".mov");

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose, onPrev, onNext]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return createPortal(
        <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95"
            onClick={onClose}
        >
            <div
                className="relative flex items-center justify-center w-full h-full p-4 md:p-10"
                onClick={(e) => e.stopPropagation()}
            >
                {isVideo ? (
                    <video
                        key={file}
                        src={file}
                        controls
                        autoPlay
                        playsInline
                        className="max-w-full max-h-[85vh] rounded-lg shadow-2xl outline-none"
                    />
                ) : (
                    <Image
                        key={file}
                        src={file}
                        alt=""
                        width={1600}
                        height={1200}
                        className="max-w-full max-h-[85vh] w-auto h-auto rounded-lg shadow-2xl object-contain"
                    />
                )}

                {/* Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                               rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    aria-label="Cerrar"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Anterior */}
                {index > 0 && (
                    <button
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                                   rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                        aria-label="Anterior"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Siguiente */}
                {index < files.length - 1 && (
                    <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                                   rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                        aria-label="Siguiente"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                {/* Contador */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/50 font-mono">
                    {index + 1} / {files.length}
                </div>
            </div>
        </div>,
        document.body
    );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export default function Projects() {
    const [active, setActive] = useState<Category>("peliculas");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const userInteracted = useRef(false);

    const data: Record<Category, string[]> = {
        peliculas: [],
        series: [],
        comerciales: [
            "/comerciales/1d548726-a76b-41db-8033-d3c72c0c50f2.MP4",
            "/comerciales/3a75ab39-89ec-415d-aff0-b91619d8ff05.MP4",
            "/comerciales/9d286b2e-9458-4d5a-b61c-d6dbff25877e.MP4",
            "/comerciales/060c48e6-85c1-4ee5-8666-516d6e2174f5.mov",
            "/comerciales/670245a8-8e6d-4873-9052-e884038a6e0e.mov",
            "/comerciales/b4616f26-672f-477c-a50a-a1d95c847b44.MP4",
            "/comerciales/c1d09f77-8213-4c06-ab76-c6d5d9e4b427.mov",
            "/comerciales/cd7a3177-246a-4e6a-b542-6a7d292839df.MP4",
            "/comerciales/d0f3dbe6-ef86-48b7-8bcc-9e87d71f5f7c.mov",
            "/comerciales/d5d9b062-7601-4dd6-a569-3e640867acf0.MP4",
            "/comerciales/d5f5f908-4e46-4773-a1b9-5566405013f5.MP4",
            "/comerciales/ea5d2475-7431-48c4-8f6b-e4fe5022601f.mov",
            "/comerciales/f5e51c3e-9afa-4cce-917c-3723b99f9927.MP4",
            "/comerciales/f7cb34dd-7924-43ef-b9bb-83e6cc938640.MP4",
            "/comerciales/4edf3976-ea9b-4ae7-846c-9c1f3a83d288.mov",
            "/comerciales/7a77cdeb-a27d-402b-86a9-7c6d2b1a4754.MP4",
            "/comerciales/0318.MP4",
            "/comerciales/b76cdcd2-d42c-4441-a55b-c9471ff68a87.mov",
            "/comerciales/bc6cccf2-346e-4e37-a1f1-1a8d311fa090.MP4",
        ],
        rodaje: [
            "/rodaje/8b874467-b39d-427e-91eb-ef6c8becc1fa.jpg",
            "/rodaje/88d6fd33-bc08-4c56-8267-746460a5692e.JPG",
            "/rodaje/529c269e-7f1b-4823-b4a6-9cf02f9da235.JPG",
            "/rodaje/9164f9ce-65cb-49fc-b725-9666bfc70f5a.JPG",
            "/rodaje/33895650-016f-4564-932d-dadbbd0c6212.JPG",
            "/rodaje/45048681-C778-420F-81AA-BBC9893BDAA9.JPG",
            "/rodaje/aed5b7d8-a5bf-4ff1-bf0b-b6f161b63210.jpg",
            "/rodaje/b7e875c2-25c6-4269-9de2-9cb2aa793943.JPG",
            "/rodaje/c5a55e4d-9073-44cb-b931-63bdc5e4a7fa.jpg",
            "/rodaje/cc9e8d1e-d558-4297-9507-7725f2659076.JPG",
            "/rodaje/d68aa50a-2fbe-474b-9bef-eda6c393cd5b.jpg",
            "/rodaje/IMG_0618.jpg",
            "/rodaje/IMG_1068.png",
            "/rodaje/IMG_1076.jpg",
            "/rodaje/IMG_1529.jpg",
            "/rodaje/IMG_1561.jpg",
            "/rodaje/IMG_1802.jpg",
            "/rodaje/IMG_2471.jpg",
            "/rodaje/IMG_6729.jpg",
            "/rodaje/IMG_8447.png",
            "/rodaje/IMG_8782 2.jpg",
            "/rodaje/IMG_9063.jpg",
            "/rodaje/IMG_9107.jpg",
        ],
    };

    const tabs: { id: Category; label: string; count: number }[] = [
        { id: "peliculas", label: "Películas", count: data.peliculas.length },
        { id: "series", label: "Series", count: data.series.length },
        { id: "comerciales", label: "Comerciales", count: data.comerciales.length },
        { id: "rodaje", label: "En Rodaje", count: data.rodaje.length },
    ];

    const currentFiles = data[active];

    const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevItem = useCallback(() =>
        setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
    const nextItem = useCallback(() =>
        setLightboxIndex((i) => (i !== null && i < currentFiles.length - 1 ? i + 1 : i)), [currentFiles.length]);

    // Sliding indicator
    useEffect(() => {
        const container = tabsRef.current;
        const indicator = indicatorRef.current;
        if (!container || !indicator) return;
        const activeBtn = container.querySelector<HTMLButtonElement>(`[data-id="${active}"]`);
        if (!activeBtn) return;
        indicator.style.width = `${activeBtn.offsetWidth}px`;
        indicator.style.left = `${activeBtn.offsetLeft}px`;
        if (userInteracted.current) {
            activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }, [active]);

    useEffect(() => {
        AOS.refresh();
    }, [active]);

    return (
        <section className="py-10">
            {/* Header */}
            <div className="mb-12 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-serif mb-4">
                    Nuestros <span className="text-gold">Proyectos</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                    Un recorrido por nuestras producciones.
                </p>
            </div>

            {/* Tabs */}
            <div className="relative mb-10">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gray-700 z-0" />
                <div
                    ref={tabsRef}
                    className="relative flex overflow-x-auto"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    <div
                        ref={indicatorRef}
                        className="absolute bottom-0 h-0.5 bg-gold transition-all duration-300 ease-out z-10"
                        style={{ left: 0, width: 0 }}
                    />
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            data-id={tab.id}
                            onClick={() => { userInteracted.current = true; setActive(tab.id); }}
                            className={`
                                relative flex items-center gap-2
                                px-4 sm:px-5 py-3
                                text-sm font-medium tracking-wide
                                whitespace-nowrap shrink-0
                                transition-all duration-200
                                ${active === tab.id
                                    ? "text-black bg-gold rounded-t-lg"
                                    : "text-gray-500 hover:text-gray-200"
                                }
                            `}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`
                                    text-[10px] px-1.5 py-0.5 rounded-full
                                    font-mono tabular-nums leading-none
                                    ${active === tab.id
                                        ? "bg-yellow-700/40 text-black"
                                        : "bg-white/10 text-gray-400"
                                    }
                                `}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery */}
            {currentFiles.length ? (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
                    {currentFiles.map((file, i) => {
                        const isVideo =
                            file.toLowerCase().endsWith(".mp4") ||
                            file.toLowerCase().endsWith(".mov");

                        return (
                            <div
                                key={i}
                                data-aos="fade-up"
                                data-aos-delay={i * 30}
                                className="break-inside-avoid overflow-hidden rounded-md group bg-black relative cursor-pointer"
                                onClick={() => openLightbox(i)}
                            >
                                {isVideo ? (
                                    <VideoThumbnail src={file} />
                                ) : (
                                    <div className="relative w-full">
                                        <Image
                                            src={file}
                                            alt={`Proyecto ${i + 1}`}
                                            width={800}
                                            height={600}
                                            className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="py-24 flex flex-col items-center gap-3 text-center">
                    <span className="text-4xl opacity-30">🎬</span>
                    <p className="text-gray-500 italic text-sm tracking-widest uppercase">
                        Próximamente
                    </p>
                </div>
            )}

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    files={currentFiles}
                    index={lightboxIndex}
                    onClose={closeLightbox}
                    onPrev={prevItem}
                    onNext={nextItem}
                />
            )}
        </section>
    );
}