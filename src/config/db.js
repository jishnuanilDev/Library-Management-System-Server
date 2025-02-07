require('dotenv').config();
const mongoose = require("mongoose");

// const dbConnect = () => {
//   mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => {
//       console.log("Mongodb connected successfully");
//     })
//     .catch((err) => console.log(err.message));
// };

const dbConnect = () => {
  mongoose
    .connect(process.env.ATLAS_URL)
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch((err) => console.log(err.message));
};

module.exports = dbConnect;



