import React from 'react'
import 'twin.macro'
import { useAlertStore } from '../hooks/useAlertStore'
export interface PropsAlert {
  rectPosition: DOMRect | undefined
}

export const Alert: React.FC<PropsAlert> = ({ rectPosition, children }) => {
  if (!rectPosition) return null

  const { removeAlert } = useAlertStore()
  const timeoutRef = React.useRef<number>(0)
  React.useEffect(() => {
    if (!children) return

    clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      removeAlert()
    }, 3000)
  }, [children])

  return (
    <div tw="flex justify-center">
      <div
        style={{ ...rectPosition, top: rectPosition?.top - 50 }}
        tw="bg-blue-500 text-white absolute p-3 rounded-lg "
      >
        {children}
      </div>
    </div>
  )
}
