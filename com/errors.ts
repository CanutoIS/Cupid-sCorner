export {}

class DuplicityError extends Error {
    constructor(message: string)  {
        super(message)
        
        // this.name = DuplicityError.name
    }

    get name() { return DuplicityError.name }
}

class ContentError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return ContentError.name }
}

class ExistenceError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return ExistenceError.name }
}

class AuthError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return AuthError.name }
}

class UnknownError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return UnknownError.name }
}

export default {
    DuplicityError,
    ContentError,
    ExistenceError,
    AuthError,
    UnknownError,
}