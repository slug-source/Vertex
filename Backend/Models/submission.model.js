import mongoose from 'mongoose';

const submissionScheme = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true
    },
    verdict: {
        type: String,
        required: true
    },
    testCasesPassed: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['cpp', 'javascript', 'python'],
        required: true
    }
},
    { timestamps: true });

const Submission = mongoose.model('Submission', submissionScheme);
export default Submission;