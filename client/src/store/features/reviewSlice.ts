import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Reviews {
    _id?:string
    startupId:string | undefined
    rating: number;
    comment: string;
    user:string
}

let BASE_URL;
if(import.meta.env.VITE_NODE_ENV === "development"){
    BASE_URL = 'http://localhost:3000/api/reviews'
}else{
    BASE_URL = 'https://startup-directory-server.vercel.app/api/reviews'
}


interface ReviewState {
    review: Reviews[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export const fetchReview = createAsyncThunk('startups/fetchReview',async() => {
    const response = await axios.get(BASE_URL)
    return response.data.reviews as Reviews[]
})

export const postReview = createAsyncThunk('startup/postReview', async(initialReview:Reviews) => {
    const { startupId } = initialReview
    const response = await axios.post(`${BASE_URL}/${startupId}`,initialReview)
    return response.data.newReview as Reviews
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
            state.review = action.payload || []
        })
        .addCase(fetchReview.rejected, (state,action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'something went wrong'
        })
        .addCase(postReview.fulfilled, (state,action) => {
            state.review = [action.payload, ...state.review]
        })
    }
})


export const allReview = (state:RootState) => state.review.review || []
export const getReviewStatus = (state:RootState) => state.review.status; 
export const getReviewError = (state:RootState) => state.review.error ;

export const selectReviewsByStartupId = (state: RootState, id: string | undefined) =>{
    if(!state.review.review || !Array.isArray(state.review.review)){
        return []
    }
    return state.review.review.filter((review) => review.startupId === id);}


export default reviewSlice.reducer