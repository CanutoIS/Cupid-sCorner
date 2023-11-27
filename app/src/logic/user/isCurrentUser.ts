import { context } from ".."
import { utils } from "com"

const { extractSubFromToken } = utils

/**
 * Checks if the user id belongs to the current user.
 */

export default (userId: string) => userId === extractSubFromToken(context.token)