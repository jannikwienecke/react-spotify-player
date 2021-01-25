import React from 'react'
import { ListItem } from './List'

export interface ListTextProps {
  item: ListItem
}

export const ListText: React.FC<ListTextProps> = ({ item }: ListTextProps) => {
  const isActiveClass = item.isActive && 'list-text-is-active'
  return (
    <div className={`list-box-list-text ${isActiveClass}`}>
      <div className="list-box-list-text-header">{item.name}</div>
      <div className="list-box-list-text-name">{item.subName}</div>
    </div>
  )
}
