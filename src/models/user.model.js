    import mongoose from 'mongoose';
    import bcrypt from 'bcrypt';
    import  JsonWebToken from "jsonwebtoken";
    const userSchema=new mongoose.Schema({
        username:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true,
            index:true
        },
        watchHistory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video'
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true
        },
        FullName:{
            type: String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            required:true
        },
        coverImage:{
            type:String,
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        refreshToken:{
            type:String
        }


    },{timestamps:true})            //data model for user
    userSchema.pre('save',async function (next) {
        if(!this.isModified('password')) return next()
            this.password= await bcrypt.hash(this.password,10)
        next()
    })
    userSchema.methods.isPasswordCorrect=async function (password) {
        return await bcrypt.compare(password,this.password)
    }
    userSchema.methods.generateAccessToken=function(){
        return JsonWebToken.sign({
            _id:this._id,
            username:this.username,
            email:this.email,
            FullName:this.FullName
        }
    , process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
    
    }
    userSchema.methods.generateRefreshToken=function(){
        return JsonWebToken.sign({
            _id:this._id,
        }
    , process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
    
    }
    export const User=mongoose.model('User',userSchema);