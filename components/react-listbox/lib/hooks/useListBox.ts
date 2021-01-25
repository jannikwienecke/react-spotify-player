import React from 'react'
import { ListItem } from '../components/List'

interface PropsUseListBox {
  listItems: ListItem[]
  onChange: (activeItem: ListItem) => void
}

export const useListBox = ({ listItems, onChange }: PropsUseListBox) => {
  let [value, setValue] = React.useState<ListItem>(listItems[0])

  const handleChange = (itemName: string) => {
    listItems.forEach(item => {
      if (item.name === itemName) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    const selectedItem = listItems.find(item => item.name === itemName)
    if (!selectedItem) return

    setValue(selectedItem)

    onChange(selectedItem)
  }

  return { value, handleChange }
}
