import React from 'react'
import deviceGreen from '../public/speaker-green.svg'

export const DeviceButton = () => {
  return (
    <div tw="h-1/3 flex items-start">
      <button tw="focus:outline-none" style={{ width: '50px' }}>
        <img alt="heart" src={deviceGreen} />
      </button>
    </div>
  )
}
