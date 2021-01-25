import React from 'react'
import speakerLogo from '../../public/speaker.svg'
import './Button.css'

export interface PropsStylesButton {
  width: string
  height: string
}
interface PropsButton {
  stylesButton?: PropsStylesButton
  ButtonComp?: React.FC
}
const Button: React.FC<PropsButton> = ({ stylesButton, ButtonComp }) => {
  return (
    <div className="box-list-button-wrapper">
      {!ButtonComp ? (
        <button className="box-list-button" style={stylesButton}>
          <img
            src={speakerLogo}
            alt="speaker-small"
            width="100%"
            height="100%"
          />
        </button>
      ) : (
        <ButtonComp />
      )}
    </div>
  )
}
export default Button
