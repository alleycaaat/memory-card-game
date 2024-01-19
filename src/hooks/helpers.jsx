import { databases } from './api';

//** get the cards from the right deck
export const getCards = async (category) => {
    let collectionId;
    let DATABASE_ID;
    const DB = '6542ac00dbf00f97c906'

    switch (true) {
        case category == 'programming':
            DATABASE_ID = DB;
            collectionId = '65aac74e44bc9b59f23b';
            break;
        case category == 'colors':
            DATABASE_ID = DB;
            collectionId = '65aac5acd011dc02c7b5';
            break;
        case category == 'math':
            DATABASE_ID = DB;
            collectionId = '6542ac05a9938ee0abe8';
            break;
        default:
            break;
    }

    try {
        var docs = await databases.listDocuments(DATABASE_ID, collectionId);
        return docs.documents;
    } catch (e) {
        console.log('get cards error:', e);
    }
};