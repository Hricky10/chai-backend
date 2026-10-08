import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadoncloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null;

        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        });

        console.log(
            "File is uploaded on Cloudinary:",
            response.url
        );

        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }

        return response;

    } catch (error) {

        if (localfilepath && fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }

        return null;
    }
};

export { uploadoncloudinary };