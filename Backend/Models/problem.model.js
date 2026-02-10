import mongoose from 'mongoose';

const problemScheme =  mongoose.Schema(
    {
        title: {
         type : String,
         required: true    
        },
        problemstatement : {
         type : String,
         required: true    
        },
        constraints: {
         type : String,
         required: true    
        },
        author: {
         type : mongoose.Schema.Types.ObjectId,
         ref : "User",
         required: true,
         index: true
        },
        visiblecases: [{
            input: {type: String, required: true},
            output: {type: String, required: true},
        }],
        hiddencases: [{
            input: {type: String, required: true},
            output: {type: String, required: true},
        }]
    }
)

const Problem = mongoose.model('Problem', problemScheme);
export default Problem;