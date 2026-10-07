import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_KEY
});

const uploadoncloudinary= async (localfilepath)=>{
    try{
        if(!localfilepath) return null
        const response=await cloudinary.uploader.upload

        cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
    console.log("file is uploaded on cloudianry",response.url);
    return response
    }
    catch(error){
        fs.unlinkSync(localfilepath) // remove the locally saved tem file as the uplaod got failed
        return null;
    }
}