import { registerAs } from "@nestjs/config";
export default registerAs("nodemailer", () => ({
    email: process.env.NODEMAILER_EMAIL,
    password: process.env.NODEMAILER_PASSWORD,
}));
