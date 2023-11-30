export const context = {
    set postId(postId: string) {
        if (!postId) {
            delete sessionStorage.postId

            return
        }

        sessionStorage.postId = postId
    },
    get postId() {
        return sessionStorage.postId
    },
    set category(category: string) {
        if (!category) {
            delete sessionStorage.category

            return
        }

        sessionStorage.category = category
    },
    get category(): string {
        return sessionStorage.category
    },
    set productId(productId: string | null) {
        if (!productId) {
            delete sessionStorage.productId

            return
        }

        sessionStorage.productId = productId
    },
    get productId(): string {
        return sessionStorage.productId
    },
    set imageNumber(imageNumber: string) {
        if (!imageNumber) {
            delete sessionStorage.imageNumber

            return
        }

        sessionStorage.imageNumber = imageNumber
    },
    get imageNumber(): string {
        return sessionStorage.imageNumber
    },
}