const express = require('express');
const mongoose = require('mongoose');

// Слушаем 3000 порт
const { PORT = 3000, DBlink = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DBlink);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
