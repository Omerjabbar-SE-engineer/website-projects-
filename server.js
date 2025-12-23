const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const port = 5000;

// Connect to MongoDB  we put the fcomnmnection of the  moongo data base here that we msake in the app or extention
mongoose.connect('mongodb://localhost:27017/passwordManager')

// Define schema and model how the form data shows
const userSchema = new mongoose.Schema({
  weburl: String,
  name: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Optional GET route (can leave empty if you don’t need it)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST route to save data
app.post('/submitted', async (req, res) => {
  const { weburl, name, password } = req.body;

    const newUser = new User({ weburl, name, password });
    
    await newUser.save(); // Save to MongoDB
    console.log('Data received:', req.body);
    res.json({ message: 'Data submitted successfully' });
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
