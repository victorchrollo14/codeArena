const GITHUB_ID = process.env.GITHUB_ID as string;
const GITHUB_SECRET = process.env.GITHUB_SECRET as string;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const REDIS_URL = process.env.REDIS_URL;
const RABBITMQ_URL = process.env.RABBITMQ_URL as string;

const serverEnv = {
  GITHUB_ID: GITHUB_ID,
  GITHUB_SECRET: GITHUB_SECRET,
  NEXTAUTH_SECRET: NEXTAUTH_SECRET,
  REDIS_URL: REDIS_URL,
  RABBITMQ_URL: RABBITMQ_URL,
};

export { serverEnv };
