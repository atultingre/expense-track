import type { Config } from "drizzle-kit";
/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  driver: "pg",
  dbCredentials: {
    url:
      "postgresql://expense-tracker_owner:NfBz3ZaWrtp5@ep-shiny-dream-a10j48sl.ap-southeast-1.aws.neon.tech/expense-tracker?sslmode=require",
  },
};
