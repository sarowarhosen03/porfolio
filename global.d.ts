declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    BASE_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
    AUTH_URL: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    DATABASE_URL: string; // This is the Prisma connection string
  }
}
