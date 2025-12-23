const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/mybrand', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));


const formSchema = new mongoose.Schema({
    name: String,
    fathername: String,
    email: String,
    deptname: String
});
const Form = mongoose.model('Form', formSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));

});
app.post('/',(req,res)=>{
    const {username,password}=req.body;
    if(username=='omer'&& password=='1234'){
res.redirect('/home');
    }
    else{
        res.send("wrong data username or password")
    }
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontpage.html'));
});


app.get('/fillform', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/form', async (req, res) => {
    try {
        const formData = new Form(req.body);
        await formData.save();   
        res.send("Data submitted successfully!");
    } catch(err) {
        console.error(err);
        res.status(500).send("Error saving data");
    }
});

app.get('/viewabout',(req,res)=>{
  res.sendFile(path.join(__dirname,'aboutprod.html'))
})


app.get('/viewproducts', (req, res) => {
    res.sendFile(path.join(__dirname, 'viewproducts.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
