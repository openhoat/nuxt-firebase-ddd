import { type EventHandler, defineEventHandler } from 'h3'

const eventHandler: EventHandler = () => ({
  hello: 'world!',
})

export default defineEventHandler(eventHandler)
