require('dotenv').config();
const App = require('./app');
const database = require('./config/mongoDB.config');


const port = process.env.PORT;

const connectDb = async () => {
  try {
    App.listen(port, () => {
      database();
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectDb();
