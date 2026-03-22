import CardInfo from '@/src/shared/components/CardInfo'
import SectionTitle from '@/src/shared/components/Title'
import { info, socialMedias } from '../data/info'
import CardSocialMedias from '@/src/shared/components/CardSocialMedias'

export default function Contact() {
  return (
    <>
      <SectionTitle text='Contacto' />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="flex flex-col gap-3">
          <p className="text-center lg:text-left text-white/70 text-sm mb-1">
            Información de contacto:
          </p>
          {info.map(item => (
            <CardInfo
              key={`info-${item.name}`}
              data={item}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-center lg:text-left text-white/70 text-sm mb-1">
            Redes sociales:
          </p>
          {socialMedias.map(item => (
            <CardSocialMedias
              key={`social-${item.name}`}
              data={item}
            />
          ))}
        </div>

      </div>
    </>
  )
}