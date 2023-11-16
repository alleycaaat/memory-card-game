import { databases } from './api';

//** get the cards from the right deck
export const getCards = async (category) => {
    let collectionId;
    let DATABASE_ID;
    switch (true) {
        case category == 'programming':
            DATABASE_ID = '653c07f36886d745e028';
            collectionId = '653c0af237cb305d0e3f';
            break;
        case category == 'colors':
            DATABASE_ID = '6542a9463c9ed33053d4';
            collectionId = '6542a95f05a2299376d6';
            break;
        case category == 'math':
            DATABASE_ID = '6542ac00dbf00f97c906';
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