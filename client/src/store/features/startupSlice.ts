import { createSlice,createAsyncThunk,} from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";



let BASE_URL;
if(import.meta.env.VITE_NODE_ENV === "development"){
    BASE_URL = 'http://localhost:3000/api/startups'
}else{
    BASE_URL = 'https://startup-directory-server.vercel.app/api/startups'
}

interface Startup {
    _id?:string;
    name: string;
    description: string;
    services: string;
    email: string;
    contact: string;
    address: string;
    operatingHours: string;
    website: string;
    review?:Reviews[]
    image?:string
}

interface Reviews {
    name: string;
    rating: number;
    comment: string;
    user:string
}

interface DeleteStartup {
    _id:string
}

export const fetchStartups = createAsyncThunk('startups/fetchStartups',async() => {
    const response = await axios.get(BASE_URL)
    return (await response.data) as Startup[]
})


export const updateStartup = createAsyncThunk('startups/updateStartup',async(initialStartup:Startup) => {
    const { _id } = initialStartup;
    const response = await axios.patch(`${BASE_URL}/${_id}`, initialStartup)
    return (await response.data) as Startup
})

export const deleteStartup = createAsyncThunk('startup/deletetSartup', async(id:string) => {
    const response = await axios.delete(`${BASE_URL}/${id}`)
    return (await response.data) as DeleteStartup
})

// Define initial state with correct types
interface StartupState {
    startup: Startup[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState:StartupState = {
    startup:[],
    status:'idle',
    error:null,
}  

const startupSlice = createSlice({
    name:'startup',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchStartups.pending, (state) => {
            state.status='loading'
        })
        .addCase(fetchStartups.fulfilled, (state,action) => {
            state.status = "succeeded";
            state.startup = action.payload;
        })
        .addCase(fetchStartups.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'something went wrong'
        })
        .addCase(updateStartup.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.startup.push(action.payload)
        })
        .addCase(deleteStartup.fulfilled, (state,action) => {
            state.status = "succeeded";
            const { _id } = action.payload
            const newStartup = state.startup.filter(startup => startup._id !==_id);
            state.startup = newStartup;
        })
        
    }
})


//sending the states
export const allStartup = (state:RootState) => state.startup.startup
export const getStartupStatus = (state:RootState) => state.startup.status; 
export const getStartupError = (state:RootState) => state.startup.error ;



//sending an indiviual startup
export const selectStartupById = (state:RootState, id:string | undefined) => state.startup.startup.find(startup => startup._id === id)

export default startupSlice.reducer