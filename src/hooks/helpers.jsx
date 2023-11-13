import { databases } from './api';

const DATABASE_ID = '653c07f36886d745e028';

//** get the cards from the right deck
export const getCards = async (category) => {
    let collectionId;
    switch (true) {
        case category == 'programming':
            collectionId = '653c0af237cb305d0e3f';
            break;
        case category == 'colors':
            collectionId = '6542a9463c9ed33053d4';
            break;
        case category == 'math':
            collectionId = '6542ac00dbf00f97c906';
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