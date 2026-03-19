export default function Footer() {

    const socialMedias = [
        { name: "Facebook", image: "/facebook.svg", to: "#" },
        { name: "Instagram", image: "/instagram.svg", to: "#" },
        { name: "Tiktok", image: "/tiktok.svg", to: "#" },
    ]

    return (
        <footer className="bg-[#121112] text-center py-8 space-y-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex flex-col justify-center items-center">
                    <img src="/logoBlanco.png" alt="Logo Camarillo Casting" className="w-36"/>
                    <p>"Donde el talento encuentra su escena"</p>
                </div>

                <div className="flex flex-col justify-center items-center gap-3">
                    <p>Nuestras redes sociales</p>
                    <nav className="flex gap-3">
                        {socialMedias.map(item => (
                            <a href={item.to} key={item.name}>
                                <img src={item.image} alt={`Logo ${item.name}`} className="size-8" />
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
            <p>&copy; {new Date().getFullYear()} Camarillo Casting - Puebla, México</p>
        </footer>
    )
}
