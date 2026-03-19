"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";

import PhotoSwipeLightbox from "photoswipe/lightbox";

type Category = "peliculas" | "series" | "comerciales" | "rodaje";

export default function Projects() {
    const [active, setActive] = useState<Category>("peliculas");

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
            "/comerciales/f7cb34dd-7924-43ef-b9bb-83e6cc938640.MP4"
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
            "/rodaje/IMG_2471.jpg",
            "/rodaje/IMG_8782 2.jpg"
        ],
    };

    const tabs = [
        { id: "peliculas", label: "Películas" },
        { id: "series", label: "Series" },
        { id: "comerciales", label: "Comerciales" },
        { id: "rodaje", label: "En Rodaje" },
    ];

    // 🔥 PhotoSwipe CONFIG CORRECTA
    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: "#gallery",
            children: "a",
            pswpModule: () => import("photoswipe"),

            initialZoomLevel: "fit",
            secondaryZoomLevel: "fit",
            maxZoomLevel: 1,

            bgOpacity: 0.9,
            padding: { top: 30, bottom: 30, left: 30, right: 30 },
        });

        // 🎬 Soporte VIDEO
        lightbox.on("contentLoad", (e: any) => {
            const { content } = e;

            if (content.data.type === "video") {
                e.preventDefault();

                const video = document.createElement("video");
                video.src = content.data.src;
                video.controls = true;
                video.autoplay = true;
                video.style.width = "100%";
                video.style.height = "100%";

                content.element = video;
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
            <div className="mb-10 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-serif mb-4">
                    Nuestros <span className="text-gold">Proyectos</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                    Un recorrido por nuestras producciones.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-700 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id as Category)}
                        className={`pb-3 px-4 transition ${active === tab.id
                                ? "bg-gold text-black rounded-t-md"
                                : "text-gray-300 hover:text-white"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Galería */}
            {data[active].length ? (
                <div
                    id="gallery"
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {data[active].map((file, i) => {
                        const isVideo =
                            file.toLowerCase().endsWith(".mp4") ||
                            file.toLowerCase().endsWith(".mov");

                        return (
                            <div
                                key={i}
                                className="relative w-full aspect-3/4 overflow-hidden rounded-md group bg-black"
                            >
                                <a
                                    href={file}
                                    data-pswp-type={isVideo ? "video" : "image"}
                                >
                                    {isVideo ? (
                                        <>
                                            <video
                                                src={file}
                                                className="w-full h-full object-cover"
                                                muted
                                                loop
                                                playsInline
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                                                <div className="bg-black/60 p-3 rounded-full text-white">
                                                    ▶
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Image
                                                src={file}
                                                alt={`Proyecto ${i}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition"
                                            />
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                                        </>
                                    )}
                                </a>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-gray-300 italic">
                    Próximamente...
                </p>
            )}
        </section>
    );
}