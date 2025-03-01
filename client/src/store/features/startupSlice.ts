import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/startup'

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
}

interface Reviews {
    name: string;
    rating: number;
    comment: string;
    user:string
}

export const fetchStartups = createAsyncThunk('startups/fetchStartups',async() => {
    const response = await axios.get(BASE_URL)
    return (await response.data) as Startup[]
})

export const postStartups = createAsyncThunk('startup/postStartup', async(initialStartup:Startup) => {
    const response = await axios.post(BASE_URL,initialStartup)
    return (await response.data) as Startup
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
    error:null
};

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
        .addCase(postStartups.fulfilled, (state,action) => {
            state.startup.push(action.payload);
        })
    }
})

//sending the states
export const allStartup = (state:RootState) => state.startup.startup
export const getStartupStatus = (state:RootState) => state.startup.status; 
export const getStartupError = (state:RootState) => state.startup.error ;

export default startupSlice.reducer