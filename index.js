const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const UserData = require("./Modals/Register");
const server = express();
const port = process.env.PORT || 8080;

// Middleware
server.use(bodyParser.json());
server.use(cors());

server.post("/add_contact", async (req, res) => {
  const { firstName, lastName, email, dob, gender, number, address } = req.body;
  try {
    // Check if the email already exists in the database
    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }
    const user = new UserData({
      firstName,
      lastName,
      email,
      dob,
      gender,
      number,
      address,
    });

    const saved = await user.save();
    console.log(saved);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
});

// Define the route to fetch data from the database
server.get("/sql", async (req, res) => {
  try {
    // Use find to get all users
    const users = await UserData.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the route to fetch data by ID from the database
server.get("/fetchdata/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Use findById to find the user by their ID
    const user = await UserData.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the route to update data by ID in the database
server.put("/updatedata/:id", async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, dob, gender, number, email, address } = req.body;

  try {
    // Use findByIdAndUpdate to update the user by their ID
    const updatedUser = await UserData.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      dob,
      gender,
      number,
      email,
      address,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: `Details updated successfully ${firstName}` });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the route to fetch data by ID from the database
server.delete("/delsql/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Use findById to find the user by their ID
    const user = await UserData.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(201).json({ message: "User Delete Succesfully" });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


server.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.term; // Get the search term from the query parameters

    // Use a MongoDB query to search for data based on the search term
    const searchResults = await UserData.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { number: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete selected items
server.delete('/deleteall', async (req, res) => {
  const { selectedIds } = req.body;
  try {
    await UserData.deleteMany({ _id: { $in: selectedIds } });
    res.json({ message: 'Selected items deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// if (process.env.NODE_ENV !== 'production') {
//   const path =  require('path');

//   server.get('/',(req, res) => {
//     server.use(express.static(path.resolve(__dirname,'front-end','build')))
//     res.sendFile(path.resolve(__dirname,'jobrobo','front-end','build','index.html'))
//   });
// }

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
