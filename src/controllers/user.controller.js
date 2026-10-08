 import { asynchandler }  from "../utils/asynchandler.js";
 import {Apierror} from "../utils/Apierrors.js"
 import {User} from "../models/user.model.js"
 import {uploadoncloudinary} from "../utils/cloudinary.js"
 import {Apiresponse} from "../utils/Apiresponse.js"
 const registerUser=asynchandler(async(req, res)=>{
    // get user details from frontend
    // validation- not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // uplaod them to cloudianry, avatar
    // user object creation- create entry in db
    // remove password and refresh token filed from response
    // check for user creation
    // return response

    const {fullname, email, username, password}=req.body
    console.log("email: ",email);

    if(
        [fullname, email,username,password].some((field)=>
            field?.trim()==="")
    ){
        throw new Apierror(400,"all fields are required")
    }
    const existeduser = await User.findOne({
        $or: [{username},{email}]
    })
    if(existeduser){
        throw new Apierror(409, "User with email already exist")
    }
    const avatarlocalpath = req.files?.avatar?.[0]?.path;
    const coverimagepath = req.files?.coverImage?.[0]?.path;

    if(!avatarlocalpath){
        throw new Apierror(400, "Avatar file is required")
    }

    const avatar = await uploadoncloudinary(avatarlocalpath)
    const coverimage = await uploadoncloudinary(coverimagepath)

    if(!avatar){
         throw new Apierror(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createduser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if(!createduser){
        throw new Apierror(500, "something went wrong while registering user")

    }

    return res.status(201).json(
        new Apiresponse(201, createduser, "user registered successfully")
    )



})
export{
    registerUser,
}