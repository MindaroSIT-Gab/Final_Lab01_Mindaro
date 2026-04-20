const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://20250413_db_user:zjGvECFi0479rKmj@cluster0.fxfwgty.mongodb.net/feedback_db?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err))

const feedbackSchema = new mongoose.Schema({
    StudentName: String,
    course: String,
    rating: Number,
    comments: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/feedback', async (req, res) => {
    try{
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.status(201).send({message: "Feedback saved successfully!"});
    }catch (error){
        res.status(400).send({error: "Faild to save feedback"});
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));