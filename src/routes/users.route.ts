import { Hono } from 'hono'
import { Bindings, Variables } from '../types/env.types'
import { createUser } from '../controllers/user.controller'

const usersRoute = new Hono<{
    Bindings: Bindings;
    Variables: Variables;
}>

usersRoute.post('/registerUser', ...createUser)

export default usersRoute
