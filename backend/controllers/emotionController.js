const analyzeEmotion = require("../models/Emotions");


const FaeDetection =async (req , res) =>{
    try {
        const { emotion, confidence } = req.body;
        const newEmotion = new Emotion({ emotion, confidence });
        await newEmotion.save();
        res.status(201).json({ message: 'Emotion logged successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error logging emotion', error });
      }
    
}






module.exports = {
    FaeDetection
}