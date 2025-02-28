import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

const BASE_URL = 'http://localhost/3000/api/startup'

interface Startup {
    name: string;
    description: string;
    services: string;
    email: string;
    contact: string;
    address: string;
    operatingHours: string;
    website: string;
    review:Reviews[]
}

interface Reviews {
    name: string;
    rating: number;
    comment: string;
    user:string
}

export const fetchStartups = createAsyncThunk<Startup[]>('startups/fetchStartups',async() => {
    const response = await axios.get(BASE_URL)
    return response.data
})

export const postStartups = createAsyncThunk<Startup[]>('startup/postStartup', async(initialStartup) => {
    const response = await axios.post(BASE_URL,initialStartup)
    return response.data
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
            state.startup = action.payload;
        })
    }
})

//sending the states
export const allStartup = (state:RootState) => state.startup.startup
export const getStartupStatus = (state:RootState) => state.startup.status; 
export const getStartupError = (state:RootState) => state.startup.error ;

export default startupSlice.reducer