

const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI

export const GH_AUTH_DATA = {
    client_secret: GITHUB_CLIENT_SECRET,
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI
}

export const MONGO_URI = process.env.MONGO_URI

