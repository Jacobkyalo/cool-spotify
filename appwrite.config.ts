import { Account, Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string);

export const db = new Databases(client);
export const account = new Account(client);
export const dbId = process.env.NEXT_PUBLIC_DB_ID;
// export const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID;
