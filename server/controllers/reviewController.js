import Startup from "../models/startupModel.js";
import Review from "../models/reviewModel.js";

export const createReview = async(req,res) => {
    try{
        const { startupId } = req.params
        const startup = await Startup.findOne({_id:startupId})
        if(!startup){
            return res.status(400).json({message:"Startup not found"})
        }
        const { user,rating,comment} = req.body
        if(!user || !rating || !comment){
            return res.status(400).json({message: "All fields required"})
        }
        const newReview = new Review({
            startupId,
            user,
            comment,
            rating
        });
        startup.reviews.push(newReview._id)
        await startup.save()

        await newReview.save()

        return res.status(201).json({message:"review created",newReview})
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Server error'});
    }
}

export const getReview = async(req,res) => {
    try{
        const { startupId } = req.params
        const startup = await Startup.findOne({_id:startupId})
        if(!startup){
            return res.status(401).json({message:"Startup doesn't exist"})
        }
        const review = await Review.find({startup:startupId})
        if(review.lenght === 0){
            return res.status(200).json({message:"review is empty"})
        }
        return res.status(200).json(review)
    }catch(error){
        console.error(error)
        return res.status(500).json({message:'Server error'})
    }
}

export const deleteReview = async(req,res) => {
    try{
        const { id } = req.params
        const review = await Review.findByIdAndDelete({_id:id})
        if(!review){
            return res.status(400).json({message:'Review not found'})
        }
        return res.status(200).json({message: 'review deleted'})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:'Server error'})
    }
}

export const updateReview = async(req,res) => {
    try{
        const { id } = req.params
        const updates = req.body

        const review = await Review.findById({_id:id})
    if(!review){
      return res.status(404).json({message: 'review not found'});
    }

    const updatedReview = await Review.findByIdAndUpdate({_id:id},{$set:updates},{new:true, runValidators:true});

    return res.status(200).json({message: "Startup updated successfully",updatedReview});
    }catch(error){
        console.error(error)
        return res.status(500).json({message: "Server error"})
    }
}

export const getAllReview = async(req,res) => {
    try{
        const reviews = await Review.find({})
        if(reviews.length === 0 ){
            return res.status(200).json({message: 'Review is empty'})
        }
        return res.status(200).json({reviews})
    }catch(error){
        console.error(error);
    }
}