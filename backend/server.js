const app = require("./app");
const env = require("dotenv");
const mongoose = require("mongoose");
env.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to MONGODB");
  })
  .catch((error) => {
    console.log(error);
  });
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
