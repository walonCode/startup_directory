import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions = {
    origin:(origin,callback) => {
        console.log(`Origin ${origin}`)
        if(allowedOrigins.includes(origin) || !origin){
            callback(null,true)
        }else{
            callback(new Error(`Not Allowed by CORS`))
        }
    },
    methods: ["POST","GET","PUT","DELETE"],
    allowedHeaders : [
        'Content-Type',
        'Set-Cookie',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials'
    ],
    credentials:true
}