module.exports = {
  insertOne: async (client, doc, type) => {
    doc.type = type;

    const res = await client.index({
      index: 'twitter',
      refresh: 'true',
      body: doc,
    });

    console.log(res);
  },

  insertMany: (client) => {
    return true;
  },

  getAll: async (client) => {
    const { body } = await client.search({
      index: 'game-of-thrones',
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return body.hits.hits;
  },

  deleteOne: ({ params }) => {
    const { make, model, year } = params;
    return client.Car.findOneAndDelete({ make, model, year });
  },

  updateOne: ({ params: { make, model, year }, request: { body } }) => {
    return client.Car.findOneAndUpdate({ make, model, year }, body);
  },
};
