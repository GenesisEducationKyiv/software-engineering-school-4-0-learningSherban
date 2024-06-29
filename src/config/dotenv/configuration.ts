import { registerAs } from '@nestjs/config';
export default registerAs('dotenv', () => ({
  ...process.env
}));