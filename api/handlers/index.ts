import registerUserHandler from './user/registerUserHandler.js'
import authenticateUserHandler from './user/authenticateUserHandler.js'
import retrieveUserHandler from './user/retrieveUserHandler.js'
import retrieveUserProductsHandler from './product/retrieveUserProductsHandler.js'
import createProductHandler from './product/createProductHandler.js'
import retrieveProductHandler from './product/retrieveProductHandler.js'
import retrieveAllProductsHandler from './product/retrieveAllProductsHandler.js'
import retrieveProductsByCategoryHandler from './product/retrieveProductsByCategoryHandler.js'
import saveProductToCartHandler from './product/saveProductToCartHandler.js'
import retrieveUserCartProductsHandler from './product/retrieveUserCartProductsHandler.js'
import removeProductFromCartHandler from './product/removeProductFromCartHandler.js'
import deleteUserProductHandler from './product/deleteUserProductHandler.js'
import UpdateUserAvatarHandler from './user/UpdateUserAvatarHandler.js'
import serverStatus from './helpers/serverStatus.js'

export {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    retrieveUserProductsHandler,
    createProductHandler,
    retrieveProductHandler,
    retrieveAllProductsHandler,
    retrieveProductsByCategoryHandler,
    saveProductToCartHandler,
    retrieveUserCartProductsHandler,
    removeProductFromCartHandler,
    deleteUserProductHandler,
    UpdateUserAvatarHandler,
    serverStatus
}