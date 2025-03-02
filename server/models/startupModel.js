import mongoose, { model,Schema } from 'mongoose';

const startupSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    services: { 
        type:String, 
        required:true,
        enum : ['E_COMMERCE','BLOCKCHAIN','SOFTWARE_DEVELOPMENT','FOOD','TECHNOLOGY','HEALTHTECH','FINTECH','AR_VR','AI_ML','CLOUD_COMPUTING','BIOTECHNOLOGY','CYBERSECURITY','MEDICAL_DEVICES','MENTAL_HEALTH','HEALTHCARE','CROWD_FUNDING']
    },
    contact: { type: String, required: true },
    operatingHours: {type:String, required:true},
    address: {type:String, required:true},
    email: {type:String, required:true},
    website: {type:String, required:true},
    social:[{
        type:String,
    }],
    reviews: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
},
{ timestamps: true },
);

const Startup  = model('startup',startupSchema);

export default Startup