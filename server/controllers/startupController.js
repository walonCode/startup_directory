import Startup from "../models/startupModel.js";
import { startups } from "../data/data.js";
import fs from "fs"
import path from "path"
import { supabase }from "../configs/supabase.js"



export const getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find({});
    if(startups.length === 0){
        res.status(200).json({message:"Startup is empty"})
    }
    res.status(200).json(startups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching startups"});
  }
};


export const getStartupById = async (req, res) => {
  try {
    const { id } = req.params
    const startup = await Startup.findById({_id:id});
    if (!startup) return res.status(404).json({ message: "Startup not found" });
    res.status(200).json(startup);
  } catch (error) {
    res.status(500).json({ message: "Error fetching startup", error });
  }
};


export const createStartup = async (req, res) => {
  try {
    const { name,description,services,email,contact,address,operatingHours,website} = req.body

    if(!name || !description || !services || !email || !contact || !address || !operatingHours || !website){
        return res.status(400).json({message: 'All field required'});
    }

    const startup = await Startup.findOne({ name });
    if(startup){
      return res.status(401).json({message: "Startup already exist"})
    }

    let imageUrl; 

    if(req.file){
      const fileBuffer = fs.readFileSync(req.file.path);
      const fileName = `${name}`

      const {error} = await supabase.storage.from("startup").upload(fileName,fileBuffer, {
        contentType: req.file.mimetype,
        upsert: true 
      })

      if(error){
        console.log(error)
        return res.status(500).json({
          success:false,
          message:"upload failed",
          error
        })
      }

      fs.unlinkSync(req.file.path)

      const { data:imageDataUrl} = supabase.storage.from("startup").getPublicUrl(fileName,{
        transform: {
          width:500,
          height:500,
          quality:60
        }
      })
      imageUrl = imageDataUrl.publicUrl
    }

    const newStartup  =  new Startup({
        name,
        description,
        services,
        email,
        contact,
        address,
        operatingHours,
        website,
        image:imageUrl
    })

    await newStartup.save();
    res.status(201).json({message:"Startup created",newStartup});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating startup"});
  }
};


export const deleteStartup = async (req, res) => {
  try {
    const { id } = req.params
    const startup = await Startup.findByIdAndDelete({_id:id});
    if (!startup) return res.status(404).json({ message: "Startup not found" });
    res.status(200).json({ message: "Startup deleted successfully" });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error deleting startup"});
  }
};

export const updateStartup = async (req, res) => {
  try{
    const { id } = req.params
    const updates = req.body;

    const startup = await Startup.findById({_id:id})
    if(!startup){
      return res.status(404).json({message: 'Startup not found'});
    }

    const updateStartup = await Startup.findByIdAndUpdate({_id:id},{$set:updates},{new:true, runValidators:true});

    return res.status(200).json({message: "Startup updated successfully",updateStartup});
  }catch(error){
    console.error(error)
    return res.status(500).json({message: 'Internal srver error'})
  }
}


// use this function to load all the data in the db.js file into your mongodb data base

export const insertStartups = async () => {
  try {
    await Startup.insertMany(startups); // Insert all startups at once
    console.log("Startups added to MongoDB");
  } catch (error) {
    console.error("Error inserting startups:", error);
  }
};
  
