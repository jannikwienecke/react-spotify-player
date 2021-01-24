// import { usePlay } from './usePlay'
// import { usePlayerStore } from './usePlayerStore'
// import { useRefetchCurrentSong } from './useRefetchCurrentSong'

// export const usePlayFromStack = () => {
//   const { play, status: statusPlay } = usePlay()
//   const { setAction, updatePlayer, setNextTrack } = usePlayerStore()
//   useRefetchCurrentSong(statusPlay)

//   const playFromStack = (track: SpotifyApi.TrackObjectFull) => {
//     play([track.uri])
//     setNextTrack(track)
//   }

//   return { playFromStack }
// }
