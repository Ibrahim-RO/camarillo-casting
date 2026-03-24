"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import PhotoSwipeLightbox from "photoswipe/lightbox";

type Category = "peliculas" | "series" | "comerciales" | "rodaje";

export default function Projects() {
    const [active, setActive] = useState<Category>("peliculas");
    const indicatorRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

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

    const userInteracted = useRef(false);

    // Sliding indicator + auto-scroll active tab into view on mobile (only on user interaction)
    useEffect(() => {
        const container = tabsRef.current;
        const indicator = indicatorRef.current;
        if (!container || !indicator) return;
        const activeBtn = container.querySelector<HTMLButtonElement>(
            `[data-id="${active}"]`
        );
        if (!activeBtn) return;
        indicator.style.width = `${activeBtn.offsetWidth}px`;
        indicator.style.left = `${activeBtn.offsetLeft}px`;

        if (userInteracted.current) {
            activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }, [active]);

    // PhotoSwipe
    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: "#gallery",
            children: "a",
            pswpModule: () => import("photoswipe"),
            initialZoomLevel: "fit",
            secondaryZoomLevel: 1.5,
            maxZoomLevel: 3,
            bgOpacity: 0.95,
            padding: { top: 40, bottom: 40, left: 40, right: 40 },
        });

        // Pausar todos los videos del grid al abrir el lightbox
        lightbox.on("beforeOpen", () => {
            document.querySelectorAll<HTMLVideoElement>("#gallery video").forEach((v) => {
                v.pause();
            });

            document.querySelectorAll<HTMLAnchorElement>("#gallery a").forEach((a) => {
                const img = a.querySelector("img");
                if (img?.naturalWidth) {
                    a.dataset.pswpWidth = String(img.naturalWidth);
                    a.dataset.pswpHeight = String(img.naturalHeight);
                }
            });
        });

        // Reanudar los videos del grid al cerrar el lightbox
        lightbox.on("close", () => {
            document.querySelectorAll<HTMLVideoElement>("#gallery video").forEach((v) => {
                v.play().catch(() => { });
            });
        });

        // Cargar video personalizado en el lightbox
        lightbox.on("contentLoad", (e: any) => {
            const { content } = e;
            if (content.data.type === "video") {
                e.preventDefault();
                const video = document.createElement("video");
                video.src = content.data.src;
                video.controls = true;
                video.autoplay = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.maxHeight = "80vh";
                video.style.objectFit = "contain";
                content.element = video;
            }
        });

        // Detener y limpiar el video del lightbox al destruirlo
        lightbox.on("contentDestroy", (e: any) => {
            const { content } = e;
            if (content.element instanceof HTMLVideoElement) {
                content.element.pause();
                content.element.src = "";
            }
        });

        lightbox.init();
        return () => lightbox.destroy();
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
                {/* Full-width bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gray-700 z-0" />

                <div
                    ref={tabsRef}
                    className="relative flex overflow-x-auto"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {/* Sliding gold underline indicator */}
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
                                <span
                                    className={`
                                        text-[10px] px-1.5 py-0.5 rounded-full
                                        font-mono tabular-nums leading-none
                                        ${active === tab.id
                                            ? "bg-yellow-700/40 text-black"
                                            : "bg-white/10 text-gray-400"
                                        }
                                    `}
                                >
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery */}
            {data[active].length ? (
                <div
                    id="gallery"
                    className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
                >
                    {data[active].map((file, i) => {
                        const isVideo =
                            file.toLowerCase().endsWith(".mp4") ||
                            file.toLowerCase().endsWith(".mov");

                        return (
                            <div
                                key={i}
                                data-aos="fade-up"
                                data-aos-delay={i * 30}
                                className="break-inside-avoid overflow-hidden rounded-md group bg-black relative"
                            >
                                <a
                                    href={file}
                                    data-pswp-type={isVideo ? "video" : "image"}
                                    className="block"
                                >
                                    {isVideo ? (
                                        <div className="relative w-full aspect-video">
                                            <video
                                                src={file}
                                                className="w-full h-full object-cover"
                                                muted
                                                loop
                                                playsInline
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center shadow-lg">
                                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-black ml-0.5">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative w-full">
                                            <Image
                                                src={file}
                                                alt={`Proyecto ${i + 1}`}
                                                width={800}
                                                height={600}
                                                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                                                onLoadingComplete={(img) => {
                                                    const anchor = img.closest("a");
                                                    if (anchor) {
                                                        anchor.dataset.pswpWidth = String(img.naturalWidth);
                                                        anchor.dataset.pswpHeight = String(img.naturalHeight);
                                                    }
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                        </div>
                                    )}
                                </a>
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
        </section>
    );
}