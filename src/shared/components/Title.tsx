type Props = {
    text: string;
};

export default function SectionTitle({ text }: Props) {
    return (
        <div className="w-full py-6 flex items-center justify-center md:justify-normal -ml-4">
            <div className="flex items-center w-full px-4">
                <div className="flex-1 lg:flex-none lg:w-20 h-0.5 bg-gold opacity-70"></div>
                <h2 className="mx-6 text-gold tracking-[0.4em] text-lg md:text-xl uppercase">
                    {text}
                </h2>
                <div className="flex-1 h-0.5 bg-gold opacity-70 md:hidden"></div>
            </div>
        </div>
    );
}