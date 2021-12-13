const mongoose = require('mongoose');

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

// Para o avaliador funcionar alterar a conexão para:
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

async function main() {
    await mongoose.connect(MONGO_DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
}

main().then(() => {
    console.log('Connect to MongoDB.');
}).catch((err) => {
    console.log(err);
});