export interface NodemailerConfig {
  email: string;
  password: string;
}

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

export default {
  email: NODEMAILER_EMAIL,
  password: NODEMAILER_PASSWORD,
} as NodemailerConfig;
