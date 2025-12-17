import { isParameter } from 'typescript'
import { z } from 'zod'
import fetch from 'node-fetch'

export const dadJoke = async () => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
  return (await res.json()).joke
}
