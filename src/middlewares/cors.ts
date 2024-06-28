import { cors } from 'hono/cors'

const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://localhost:8100'];
export function corsMiddleware({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) {
    return cors({
        origin: (origin) => {
            if (typeof origin === 'string' && acceptedOrigins.includes(origin)) {
                return origin;
            } else if (origin === undefined) {
                return null;
            }
        }
    })
}