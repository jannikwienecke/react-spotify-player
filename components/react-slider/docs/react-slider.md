# Slider for asynchron React-Applications

## What it is

_A react component that allows to_ control your async media players - works best with api's such as
Spotify. Controlling the slider allows to automatically control the position of the song/media on all connected devices

## Installation

    npm i @bit/jannikwienecke.personal.react-slider
    // or yarn
    yarn add @bit/jannikwienecke.personal.react-slider

## Usage Examples

### Usage - MOST BASIC - Without External Control

```jsx
mport  React  from  "react";
import  Slider  from  "../lib";

const  App  =  ()  =>  {

	const  state  =  {
		isPlaying:  true
		currentMediaId: 1
		currentMsSong: 10000
		totalMsSong: 200000
	}

	return  (
		<Slider
			state={state}
			onChange={() => console.log("SLIDER POSITION CHANGED"}
			onDragStart={() => console.log("USER DRAG START"}
		/>
	);
};
export  default  App;
```

---

### Usage - BASIC - Client State Control

```jsx
import React from 'react'
import Slider, { useSlider } from '../lib'

const App = () => {
  const [currentMs, setCurrentMs] = React.useState(0)
  const [play, setPlay] = React.useState(false)
  const [status, setStatus] =
    (React.useState < 'idle') | 'loading' | ('success' > 'idle')

  // MOCK AN API CALL TO THE SERVICE THAT IS MANAGING THE STATE - e.g. Spotify
  const onMsChange = (ms: number) => {
    setStatus('loading')
    setTimeout(() => {
      setCurrentMs(ms)
      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
      }, 10)
    }, 1000)
  }

  const EXAMPLE_TOTAL_LENGTH_SONG = 200000
  const EXAMPLE_STATE_UPDATE_INTERVALL = 3000
  const EXAMPLE_MEDIA_ID = 3000

  // USE THE PROVIDED HOOK TO CONTROL THE CLIENT STATE
  const { state, handleDragStart, handleMsChange } = useSlider({
    currentMsSong: currentMs,
    media: { mediaId: EXAMPLE_MEDIA_ID, totalMs: EXAMPLE_TOTAL_LENGTH_SONG },
    isPlaying: play,
    stateUpdateIntervall: EXAMPLE_STATE_UPDATE_INTERVALL,
    onSettledChange: () => console.log('api call successfully'),
    onMsChange: onMsChange,
    statusRequestMsChange: status,
  })

  return (
    <div>
      <button onClick={() => setPlay(!play)}>TOGGLE PLAY</button>
      <button onClick={() => onMsChange(Math.random() * 200000)}>
        Random Ms
      </button>

      <Slider
        state={state}
        onChange={handleMsChange}
        onDragStart={handleDragStart}
      />
    </div>
  )
}
export default App
```

## Props Slider

| name                 | type     | description                                                                                                |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| state                | object   |                                                                                                            | StateSliderProps |
| onChange             | function | A Function that is called whenever a change to the Slider happens - Dragging / Clicking on the Slider      |
| onDragStart          | function | A Function that is called whenever a user starts to drag the slider                                        |
| onEnd                | function | A Function that is called whenever the slider reached the end (currentMs === totalMs of the current media) |
| state                | object   | see. StateSliderProps                                                                                      |
| stylesSlider         | object   | see. stylesSlider                                                                                          |
| stylesSliderProgress | object   | see. stylesSliderProgress                                                                                  |
| stylesPointer        | object   | see. stylesPointer                                                                                         |

---

#### StateSliderProps

| name           | type    | description |
| -------------- | ------- | ----------- |
| currentMediaId | number  | required    |
| currentMsSong  | number  | required    |
| totalMsSong    | number  | required    |
| isPlaying      | boolean | required    |

---

### stylesSlider [optional]

| name            | type   | description |
| --------------- | ------ | ----------- |
| height          | string | optional    |
| width           | string | optional    |
| backgroundColor | string | optional    |
| margin          | string | optional    |

---

### stylesSliderProgress

| name                   | type   | description |
| ---------------------- | ------ | ----------- |
| backgroundColor        | string | optional    |
| backgroundColorOnHover | string | optional    |

---

### stylesPointer

| name            | type   | description |
| --------------- | ------ | ----------- |
| width           | string | optional    |
| height          | string | optional    |
| backgroundColor | string | optional    |
| borderRadius    | string | optional    |
| top             | string | optional    |
| left            | string | optional    |
