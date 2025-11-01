import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    path: String,
    status: {
        type: String,
        enum: ['pending', 'graded'],
        default: 'pending'
    },
    grade:{
        type: Number,
        default: 0,
        max: 10
    }
})

const Submission = mongoose.model('Submission', submissionSchema)

export default Submission