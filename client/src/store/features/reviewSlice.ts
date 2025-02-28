import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Reviews {
    startupId:string | undefined
    rating: number;
    comment: string;
    user:string
}

const BASE_URL = 'http://localhost:3000/api/review'

interface ReviewState {
    review: Reviews[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export const fetchReview = createAsyncThunk('startups/fetchStartups',async(id:string) => {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return (await response.data) as Reviews[]
})

export const postReview = createAsyncThunk('startup/postStartup', async(initialReview:Reviews) => {
    const { startupId } = initialReview
    const response = await axios.post(`${BASE_URL}/${startupId}`,initialReview)
    return (await response.data) as Reviews
})

const initialState:ReviewState = {
    review:[],
    status:'idle',
    error:null
};

const reviewSlice = createSlice({
    name:'review',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchReview.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchReview.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.review = action.payload
        })
        .addCase(fetchReview.rejected, (state,action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'something went wrong'
        })
        .addCase(postReview.fulfilled, (state,action) => {
            state.review.push(action.payload)
        })
    }
})


export const allReview = (state:RootState) => state.review.review
export const getReviewStatus = (state:RootState) => state.review.status; 
export const getReviewError = (state:RootState) => state.review.error ;


export default reviewSlice.reducer