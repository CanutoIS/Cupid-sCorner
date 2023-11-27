import { context } from ".."
import { utils } from "com"

const { isTokenValid, isTokenAlive } = utils

/**
 * Checks if the token is valid and has not expired yet.
 */

export default () => context.token && isTokenValid(context.token) && isTokenAlive(context.token)