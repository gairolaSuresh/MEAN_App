const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/blogApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((e) => {
    console.error(`Error in Connecting Database`, e);
  });
