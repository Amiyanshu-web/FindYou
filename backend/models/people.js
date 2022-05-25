import mongoose from 'mongoose';

const peopleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    identification: {
        type: String,
        required: true
    }
});

const People = mongoose.model('Missing', peopleSchema);
export default People;