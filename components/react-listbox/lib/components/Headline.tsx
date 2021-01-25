import './Headline.css'

import React from 'react'

export interface PropsHeadline {
  text: string
  styles?: React.CSSProperties
}
const Headline: React.FC<PropsHeadline> = ({ text, styles }) => {
  return (
    <>
      <div>
        <h3 className="list-box-headline" style={styles}>
          {text}
        </h3>
      </div>
    </>
  )
}
export default Headline
