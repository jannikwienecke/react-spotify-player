import React from 'react'
import { GlobalStyles } from 'twin.macro'
import NavPlayer from './components/NavPlayer'
import './index.css'

export const TEMP_TOkEN =
  'BQDg94SfxP7Bus7QVKXF3JSm0cgl1CWdN5UlCBX5PoBBLIzq81RIcDkA03wLU8XbLbCSm_JJtfxgRPMMInf6xo8RvMzfKVkEAmNvoai6Kv9C8xSFpdt4EDbdCfnvkM0fPUyLwmZwAQ_hfmFp_Hl-LJWc4orSyrNLc-q-udDE58XrUClgeKgEI2V42KwZIlG9OLvNwn7IGmVmlNggtnJ-qCGqdyUMdwtpb4_H9tW-VHYens0m7Ta4sb5fCLI_tAZJ-VSZRksuZWG1ng6X'

const App = () => {
  return (
    <div tw="h-screen bg-gray-200 flex flex-col justify-end">
      <GlobalStyles />

      <h1 tw="text-5xl text-center p-10 font-bold text-spotifyGreen">
        REACT SPOTIFY PLAYER
      </h1>
      <NavPlayer
        visibleOnLoading={true}
        onReady={() => console.log('Music Player Is Ready')}
        token={TEMP_TOkEN}
      />
    </div>
  )
}

export default App
