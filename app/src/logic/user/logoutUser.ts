import { context } from "..";

/**
 * Logs out the current user by removing token from context.
 */

export default () => context.token = null