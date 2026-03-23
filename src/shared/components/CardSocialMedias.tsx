import { SocialMedia } from "@/src/features/landing/schemas"

type Props = {
    data: SocialMedia
}

export default function CardSocialMedias({ data }: Props) {
    return (
        <a
            href={data.url}
            target="_blank"
            className="
                group
                bg-white/10 backdrop-blur-md
                flex items-center gap-4
                p-4 sm:p-5 h-24 sm:h-28
                border border-transparent

                transition-all duration-300 ease-out

                hover:border-gold/70
                hover:bg-white/15
                hover:shadow-[0_10px_30px_rgba(255,215,0,0.15)]
                hover:-translate-y-1
            "
        >
            {/* ICON */}
            <div className="shrink-0">
                <div className="
                    p-2 rounded-lg
                    transition-all duration-300
                    group-hover:bg-gold/10
                    group-hover:scale-110
                ">
                    <img
                        src={data.icon}
                        alt={`Red social ${data.name}`}
                        className="size-8 sm:size-10 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* TEXT */}
            <div className="flex-1 space-y-1 min-w-0">
                <p className="
                    text-sm sm:text-base font-bold truncate
                    transition-colors duration-300
                    group-hover:text-gold
                ">
                    {data.name}
                </p>

                <p className="
                    text-sm sm:text-base truncate text-white/70
                    transition-colors duration-300
                    group-hover:text-white
                ">
                    {data.info}
                </p>
            </div>

            {/* ARROW */}
            <div className="shrink-0">
                <img
                    src="/arrow.png"
                    alt="Ver más"
                    className="
                        size-6 sm:size-7 opacity-60
                        transition-all duration-300
                        group-hover:opacity-100
                        group-hover:translate-x-1
                    "
                />
            </div>
        </a>
    )
}