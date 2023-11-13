/* eslint-disable no-undef */
import { Account, Avatars, Client, Databases } from 'appwrite';

const PROJECT_ID = '653c022b02f7ed3e5ae4';
// eslint-disable-next-line react-refresh/only-export-components
const ENDPOINT = 'https://cloud.appwrite.io/v1';


const client = new Client();
client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);


export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);