export default function Footer() {

    const socialMedias = [
        { name: "Facebook", image: "/facebook.svg", to: "https://www.facebook.com/share/1C3utTEUJQ/?mibextid=wwXIfr" },
        { name: "Instagram", image: "/instagram.svg", to: "https://www.instagram.com/camarillo_casting?igsh=MWlzZmhwaGg2aTd2Zw==" },
        { name: "Tiktok", image: "/tiktok.svg", to: "https://www.tiktok.com/@camarillo.casting?_r=1&_t=ZS-94voVh0COdl" },
    ]

    return (
        <footer className="bg-[#121112] text-center py-8 space-y-8 text-white">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center lg:items-start gap-3">
                    <img src="/logoBlanco.png" alt="Logo Camarillo Casting" className="w-36" />
                    <p className="max-w-md px-4 lg:p-0 text-center lg:text-left">"Donde el talento encuentra su escena y el casting se convierte en respaldo para tu producción"</p>
                </div>

                <div className="flex flex-col justify-center items-center gap-3">
                    <p>Nuestras redes sociales</p>
                    <nav className="flex gap-3">
                        {socialMedias.map(item => (
                            <a href={item.to} key={item.name} target="_blank">
                                <img src={item.image} alt={`Logo ${item.name}`} className="size-8" />
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
            <div className="space-y-2">
                <p>&copy; {new Date().getFullYear()} Camarillo Casting - Puebla, México</p>
                <p className="text-sm text-gray-400">Sitio web elaborado por: <a href="https://www.devstackstudio.com.mx/" target="_blank" className="text-gold hover:underline">DevStack Studio</a></p>
            </div>
        </footer>
    )
}
