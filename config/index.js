import dotenv from "dotenv";
import path from "path";

const environment = process.env.NODE_ENV || "development";
const envFilePath = path.resolve(process.cwd(), `.env.${environment}`);

dotenv.config({ path: envFilePath });

const serverConfig = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
};

const config = {
  serverConfig
};

export default config;