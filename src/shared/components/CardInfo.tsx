import { Contact } from "@/src/features/landing/schemas"

type Props = {
    data: Contact
}

export default function CardInfo({ data }: Props) {
    return (
        <div className="bg-white/10 flex flex-row items-center gap-4 p-4 sm:p-5 h-24 sm:h-28">
            <div className="shrink-0">
                <div className="p-2">
                    <data.icon className="size-6 sm:size-10 text-gold" />
                </div>
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-gold text-xs sm:text-sm leading-tight">{data.name}</p>
                <p className="text-sm sm:text-base font-bold truncate">{data.info}</p>
                <p className="text-xs text-gray-400 line-clamp-1">{data.description}</p>
            </div>
        </div>
    )
}