import React from 'react'
import { ListboxOption } from '@reach/listbox'
import deviceLogo from '../../public/device.svg'
import { ListText } from './ListText'
import './List.css'

export type ListItem = {
  id: string
  name: string
  subName?: string
  isActive: boolean
  imageSrc?: string
}
interface ListProps {
  listItems: ListItem[]
  stylesUl?: React.CSSProperties
  stylesOption?: React.CSSProperties
  logoSrc?: string
}

export type Ref = HTMLDivElement | any

export const List = React.forwardRef<Ref, ListProps>(
  ({ listItems, stylesUl, stylesOption, logoSrc }, ref) => {
    return (
      <ul className="list-box-list-wrapper" style={stylesUl}>
        {listItems.map((item, index) => {
          return (
            <ListboxOption
              key={item.id + '_' + index}
              className="list-box-list-item"
              style={stylesOption}
              value={item.name}
            >
              {item.isActive ? (
                <div className="list-box-list-logo" ref={ref}>
                  <img
                    alt="device"
                    src={
                      item.imageSrc
                        ? item.imageSrc
                        : logoSrc
                        ? logoSrc
                        : deviceLogo
                    }
                    height="75px"
                    width="75px"
                  />
                </div>
              ) : (
                <div className="list-box-list-logo">
                  <img
                    alt="device"
                    src={
                      item.imageSrc
                        ? item.imageSrc
                        : logoSrc
                        ? logoSrc
                        : deviceLogo
                    }
                    height="75px"
                    width="75px"
                  />
                </div>
              )}
              <ListText item={item} />
            </ListboxOption>
          )
        })}
      </ul>
    )
  },
)

// const List: React.forwardRef<Ref, Props>(({
//   listItems,
//   stylesUl,
//   stylesOption,
//   logoSrc,
// }, listItemRef) => {
//   return (
//     <ul className="list-box-list-wrapper" style={stylesUl}>
//       {listItems.map(item => {
//         return (
//           <ListboxOption
//             ref={listItemRef}
//             key={item.id}
//             className="list-box-list-item"
//             style={stylesOption}
//             value={item.name}
//           >
//             <div className="list-box-list-logo">
//               <img
//                 alt="device"
//                 src={
//                   item.imageSrc ? item.imageSrc : logoSrc ? logoSrc : deviceLogo
//                 }
//                 height="75px"
//                 width="75px"
//               />
//             </div>
//             <ListText item={item} />
//           </ListboxOption>
//         )
//       })}
//     </ul>
//   )
// }
export default List
