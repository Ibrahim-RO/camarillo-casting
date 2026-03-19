import CardInfo from '@/src/shared/components/CardInfo'
import SectionTitle from '@/src/shared/components/Title'
import { info, socialMedias } from '../data/info'
import CardSocialMedias from '@/src/shared/components/CardSocialMedias'

export default function Contact() {
  return (
    <>
      <SectionTitle text='Contacto' />

      <div className="space-y-5">
        <p className='text-center lg:text-left'>Información de contacto:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="grid grid-cols-1 gap-4">
            {info.map(item => (
              <CardInfo
                key={`info-${item.name}`}
                data={item}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {socialMedias.map(item => (
              <CardSocialMedias
                key={`social-${item.name}`}
                data={item}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}