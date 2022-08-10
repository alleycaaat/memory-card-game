/* these API methods will call the functions in the backend to make the database things do */

const getall = () => {
    return fetch('/.netlify/functions/getall').then((response) => {
        return response.json();
    });
};

const cards = (cat) => {
    console.log('API CALL',cat)
    return fetch('/.netlify/functions/cards', {
        body: JSON.stringify(cat),
        method: 'POST',
    }).then((response) => {
        return response.json();
    });
};
const getdeck = (cat) => {
    console.log('api calling cat: ',cat);
    return fetch('/.netlify/functions/getdeck',{
        body: JSON.stringify(cat),
        method: 'POST',
    })
    .then((res) => {
        return res.json();
    });
};
const api = {
    getall,
    getdeck,
    cards,
};

export default api;
