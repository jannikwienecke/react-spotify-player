# react-spotify-player

## Player to control your spotify web application

---


![alt text](https://github.com/jannikwienecke/react-spotify-player/blob/main/readme-images/standard.png)


## Usage

```jsx
<ReactSpotifyPlayer
  visibleOnLoading={true}
  onReady={() => console.log('Music Player Is Ready')}
  token='Your Spotify Token'
/>
```

## Props ReactSpotifyPlayer

| name             | type     | description |
| ---------------- | -------- | ----------- |
| visibleOnLoading | boolean  | optional    |
| onReady          | function | optional    |
| token            | string   | required    |

---

## Features

- Control Your Songs
- Control on which device to stream the music
- Control Volume
- Shortcut to create Song Radio
- Like Songs
- See your current playlist
- Shuffle and repeat mode

## Install

`yarn install`

## Run

`yarn start`

## Build

`yarn build`

## HOW TO - Receive Token
https://developer.spotify.com/documentation/general/guides/authorization-guide/

Example Repo that implements the authorization process of the prior link:
https://github.com/jannikwienecke/react-playlist-generator/tree/main/app

### OPEN

- Tests
- Fix Deploy

