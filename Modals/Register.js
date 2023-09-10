const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  mongoose
    .connect("mongodb://teepukhan729:F0j6n29nA83vVLlA@ac-gkfjddv-shard-00-00.9x6eki4.mongodb.net:27017,ac-gkfjddv-shard-00-01.9x6eki4.mongodb.net:27017,ac-gkfjddv-shard-00-02.9x6eki4.mongodb.net:27017/?replicaSet=atlas-xgm9dh-shard-0&ssl=true&authSource=admin",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("DB connection established");
    })
    .catch((err) => {
      console.log("DB connection Failed");
    });
}

//start schema for database
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserData = new mongoose.model("JobRoboUsers", UserSchema);
module.exports = UserData;
