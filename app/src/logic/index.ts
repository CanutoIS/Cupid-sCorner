import context from "./context"
import isCurrentUser from "./user/isCurrentUser"
import isUserLoggedIn from "./user/isUserLoggedIn"
import registerUser from "./user/registerUser"
import loginUser from "./user/loginUser"
import retrieveUser from "./user/retrieveUser"
import retrieveUserProducts from "./product/retrieveUserProducts"
import createProduct from "./product/createProduct"
import retrieveProduct from "./product/retrieveProduct"
import retrieveAllProducts from "./product/retrieveAllProducts"
import retrieveProductsByCategory from "./product/retrieveProductsByCategory"
import saveProductToCart from "./product/saveProductToCart"
import retrieveUserCartProducts from "./product/retrieveUserCartProducts" 
import removeProductFromCart from "./product/removeProductFromCart"
import deleteUserProduct from "./product/deleteUserProduct"
import logoutUser from "./user/logoutUser"
import UpdateUserAvatar from "./user/UpdateUserAvatar"

export {
    context,
    isCurrentUser,
    isUserLoggedIn,
    registerUser,
    loginUser,
    retrieveUser,
    retrieveUserProducts,
    createProduct,
    retrieveProduct,
    retrieveAllProducts,
    retrieveProductsByCategory,
    saveProductToCart,
    retrieveUserCartProducts,
    removeProductFromCart,
    deleteUserProduct,
    logoutUser,
    UpdateUserAvatar,
}