import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String], //it will store the user id's of user who liked the post
        default:[],
    },
    comments: {type: [String], default: []},
    createdAt: {
        type:Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;