"use client";

import SectionTitle from '@/src/shared/components/Title'

export default function About() {
    return (
        <div className='py-10'>

            {/* Título */}
            <div data-aos="fade-up">
                <SectionTitle text='¿Quiénes somos?' />
            </div>

            <section className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

                {/* Texto */}
                <article
                    className='space-y-3'
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    <p>
                        <b>Camarillo Casting</b> es una agencia especializada en la contratación y gestión de extras para producciones audiovisuales, dedicada a conectar talento diverso con las necesidades específicas de cada proyecto. <br />
                        Nuestro objetivo es <b>facilitar el proceso</b> a través de una selección cuidadosa y una gestión profesional del talento.
                    </p>

                    <p data-aos="fade-right" data-aos-delay="200">
                        Con <b>origen en Puebla</b>, hemos construido una forma de trabajo basada en la eficiencia, la organización y la comunicación clara. En Camarillo Casting creemos que una agencia debe ser un aliado estratégico para las producciones, aportando soluciones que permitan que cada proyecto se desarrolle de manera ágil y con altos estándares profesionales.
                    </p>

                    <p data-aos="fade-right" data-aos-delay="300">
                        Actualmente nos encontramos en constante búsqueda de nuevas oportunidades y retos dentro de la industria audiovisual, con la convicción de que cada proyecto en el que participamos se convierte en una oportunidad para entregar resultados de excelencia.
                    </p>
                </article>

                {/* Imagen */}
                <article
                    className='flex justify-center items-center'
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    <img
                        src="/logoBlanco.png"
                        alt="Logo Camarillo Casting"
                        className='w-full lg:w-2/3'
                    />
                </article>

            </section>
        </div>
    )
}