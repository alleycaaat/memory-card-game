const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET,
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    });
    const cat = JSON.parse(event.body);

    console.log(cat,' CARDS CAT')
    return client
            .query(q.Paginate(q.Match(q.Ref(`indexes/${cat}`))))
            .then((res) => {
                const resref = res.data
                const getQ = resref.map((ref) => {
                    return q.Get(ref)
                })
                return client.query(getQ).then((ret) => {
                    console.log('Success!')
                    return {
                        statusCode: 200,
                        body: JSON.stringify(ret),
                    };
                })
            })
        .catch((error) => {
            console.log('error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
