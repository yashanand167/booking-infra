import { Hono } from 'hono'
import { Bindings, Variables } from '../types/env.types'
import { createEvent } from '../controllers/event.controller';

const eventsRoute = new Hono<{
    Bindings: Bindings;
    Variables: Variables;
}>

eventsRoute.post('/createEvent', ...createEvent)

export default eventsRoute