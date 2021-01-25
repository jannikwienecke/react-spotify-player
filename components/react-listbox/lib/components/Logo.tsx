import React from 'react'
import speakerLogo from '../../public/speaker.svg'
import './Logo.css'

interface PropsLogo {
  src?: string
  styles?: React.CSSProperties
  logoStyles?: {
    width: string
    height: string
  }
}
const Logo: React.FC<PropsLogo> = ({ src, styles, logoStyles }) => {
  return (
    <>
      <div className="list-box-logo-wrapper" style={styles}>
        <img
          className="list-box-logo"
          src={src ? src : speakerLogo}
          alt="speaker"
          height={logoStyles ? logoStyles.height : '100px'}
          width={logoStyles ? logoStyles.width : '100px'}
        />
      </div>
    </>
  )
}
export default Logo
