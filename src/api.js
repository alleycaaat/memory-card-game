/* the API method will call the function on the backend to make the database things do */

const cards = (cat) => {
    console.log('API CALL',cat)
    return fetch('/.netlify/functions/cards', {
        body: JSON.stringify(cat),
        method: 'POST',
    }).then((response) => {
        return response.json();
    });
};

const api = {
    cards
};

export default api;
