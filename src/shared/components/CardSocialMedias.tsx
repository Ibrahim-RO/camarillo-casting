import { SocialMedia } from "@/src/features/landing/schemas"

type Props = {
    data: SocialMedia
}

export default function CardSocialMedias({ data }: Props) {
    return (
        <div className="bg-white/10 flex items-center gap-4 p-4 sm:p-5 h-24 sm:h-28">
            <div className="shrink-0">
                <div className="p-2">
                    <img src="/facebook.svg" alt="" className="size-10 sm:size-12" />
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold truncate">{data.name}</p>
            </div>

            <div className="shrink-0">
                <img src="/arrow.png" alt="Ver más" className="size-6 sm:size-7 opacity-60" />
            </div>
        </div>
    )
}