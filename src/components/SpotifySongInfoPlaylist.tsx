import ReactListBox, {
  Headline,
  List,
} from '@bit/jannikwienecke.personal.react-listbox'
import React from 'react'
import { useSpotifySongInfoPlaylist } from '../hooks/useSpotifySongInfoPlaylist'
import { PlaylistButton } from './PlaylistButton'

export const SpotifySongInfoPlaylist = () => {
  const { value, listItems, handleChange } = useSpotifySongInfoPlaylist()
  const activeItemRef = React.useRef<HTMLDivElement>()

  if (listItems.length === 0 || !value) return null

  return (
    <div
      tw="w-24 text-center"
      onClick={() =>
        activeItemRef.current && activeItemRef.current.scrollIntoView()
      }
    >
      <ReactListBox
        value={value}
        ButtonComp={PlaylistButton}
        handleChange={handleChange}
      >
        <Headline text={'Track Queue'} />
        <List
          listItems={listItems}
          ref={activeItemRef}
          stylesUl={{ maxHeight: '400px', height: 'auto' }}
        />
      </ReactListBox>
    </div>
  )
}
