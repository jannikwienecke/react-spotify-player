// import React from 'react'

// export const useSpotifyQueue = () => {
//   const [queue, setQueue] = React.useState<SpotifyApi.TrackObjectSimplified[]>(
//     [],
//   )

//   const addTrackToQueue = (track: SpotifyApi.TrackObjectSimplified) => {
//     setQueue([...queue, track])
//   }

//   const addTracksToQueue = (tracks: SpotifyApi.TrackObjectSimplified[]) => {
//     console.log('add....')

//     setQueue([...queue, ...tracks])
//   }

//   const setNewQueue = (tracks: SpotifyApi.TrackObjectSimplified[]) => {
//     setQueue(tracks)
//   }

//   console.log('queue: ', queue)
//   return {
//     queue,
//     currentSong: queue.length > 0 ? queue[0] : undefined,
//     setNewQueue,
//     addTrackToQueue,
//     addTracksToQueue,
//   }
// }
