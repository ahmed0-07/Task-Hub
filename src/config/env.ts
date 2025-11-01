import dotenv from 'dotenv'

dotenv.config()

const requiredEnvVars = ['JWT_SECRET', 'DB_CONNECTION_STRING', 'SALT', 'PORT'];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

export {}