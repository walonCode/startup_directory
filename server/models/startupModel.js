import mongoose, { model,Schema } from 'mongoose';

const startupSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    services: { type:String, required:true},
    contact: { type: String, required: true },
    operatingHours: {type:String, required:true},
    address: {type:String, required:true},
    email: {type:String, required:true},
    website: {type:String, required:true},
    reviews: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
},
{ timestamps: true },
);

const Startup  = model('startup',startupSchema);

export default Startup