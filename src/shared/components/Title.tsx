type Props = {
    text: string;
};

export default function SectionTitle({ text }: Props) {
    return (
        <div className="w-full py-6 flex items-center">
            {/* Línea izquierda — siempre visible */}
            <div className="w-12 md:w-20 h-px bg-gold opacity-70 shrink-0" />

            {/* Texto */}
            <h2 className="mx-4 flex-1 text-center md:text-left text-gold tracking-[0.4em] text-sm md:text-lg font-medium uppercase whitespace-nowrap">
                {text}
            </h2>

            {/* Línea derecha — solo en móvil */}
            <div className="w-12 h-px bg-gold opacity-70 md:hidden" />
        </div>
    );
}