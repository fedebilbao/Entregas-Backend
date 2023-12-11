import dotenv from "dotenv";

dotenv.config();

export default {
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    mongo_uri: process.env.MONGO_URI,
    mail_admin_coder: process.env.MAIL_ADMIN_CODER,
    password_admin_coder: process.env.PASSWORD_ADMIN_CODER,

}
