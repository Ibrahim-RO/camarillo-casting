import { Contact } from "@/src/features/landing/schemas"

type Props = {
    data: Contact
}

export default function CardInfo({ data }: Props) {
    return (
        <div className="bg-white/10 h-full flex flex-row items-center gap-4 p-4 sm:p-5">
            <div className="shrink-0">
                <div className="border border-gold p-2">
                    <img src="/facebook.svg" alt="" className="size-10 sm:size-12" />
                </div>
            </div>

            <div className="flex-1 min-w-0 w-full space-y-1">
                <p className="text-gold text-sm sm:text-base">{data.name}</p>
                <p className="text-base sm:text-lg font-bold break-all sm:break-normal">{data.info}</p>
                <p className="text-xs sm:text-sm">{data.description}</p>
            </div>
        </div>
    )
}
