import Startup from "../models/startupModel.js";


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

    const startup = Startup.findOne({name});
    if(startup){
        res.status(401).json({message: "Startup already exist"})
    }

    const newStartup  = new Startup({
        name,
        description,
        services,
        email,
        contact,
        address,
        operatingHours,
        website
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
