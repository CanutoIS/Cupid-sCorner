import validators from './validators.js'
const { validateToken } = validators

function extractPayloadFromToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
}

function isTokenValid(token: string) {
    try {
        validateToken(token)

        return true
    } catch (_) {
        return false
    }
}

function isTokenAlive(token: string) {
    const { iat, exp } = extractPayloadFromToken(token)
    const now = Date.now() / 1000

    return exp - iat > now - iat
}

function extractSubFromToken(token: string) {
    const { sub } = extractPayloadFromToken(token)

    return sub
}

export default {
    isTokenAlive,
    isTokenValid,
    extractSubFromToken
}