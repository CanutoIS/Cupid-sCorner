declare global {
    namespace NodeJS {
        interface ProcessEnv {
        PORT: string;
        MONGODB_URL: string;

        JWT_SECRET: string;
        JWT_EXPIRATION: string;

        EMAIL: string;
        EMAIL_PASSWORD: string;
        }
    }
}

export {};
