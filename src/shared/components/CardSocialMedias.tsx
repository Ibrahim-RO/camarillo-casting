import { Contact } from "@/src/features/landing/schemas"

type Props = {
    data: Contact
}

export default function CardSocialMedias({ data } : Props) {
  return (
    <div className="bg-white/10 h-full flex items-center justify-between gap-4 p-5">
        <div>
            <div className="border border-gold p-2"> 
                <img src="/facebook.svg" alt="" className="size-12" />
            </div>
        </div>

        <div className="flex-1">
            <p className="text-lg font-bold">{data.info}</p>
            <p className="text-sm">{data.description}</p>
        </div>

        <div>
            <img src="/arrow.png" alt="Arrow Rigth" className="size-8" />
        </div>
    </div>
  )
}
