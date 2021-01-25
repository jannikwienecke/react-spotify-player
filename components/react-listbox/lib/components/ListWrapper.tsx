import React from 'react'

const ListWrapper: React.FC = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}
export default ListWrapper
