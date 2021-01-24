// src/index.js
import React from 'react'
import { render } from 'react-dom'
import { GlobalStyles } from 'twin.macro'
import { AppProvider, SpotifyTokenContext } from './Context'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'

export const queryClient = new QueryClient()

render(
  <>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <App />
    </QueryClientProvider>
  </>,
  document.getElementById('root'),
)
