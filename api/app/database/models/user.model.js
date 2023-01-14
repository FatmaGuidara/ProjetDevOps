const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        lowercase:true, //uppercase
        required:true,
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        trim:true,
        lowercase:true, //uppercase
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email")
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:6,
        validate(value){
            if(
                value.includes("password")|| 
                value.includes("123")||
                value.includes(this.name)
                )
                throw new Error("weak password")
        }
    },
    age:{
        type: Number,
        required:true,
        min: 20,
        max: 65,
        default: 21
    },
    gender:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        enum:["male", "female"]
    },
    userImg:{
        type: String,
        default: "defaultUser.png"
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
},{
    timestamps: true
})

// relation with products model with userId
userSchema.virtual("myProducts", {
    ref: "Product", // name of the ralated model
    localField: "_id",
    foreignField: "userId"
})

userSchema.methods.toJSON = function(){
    const deleted =["__v", "password"]
    const userData = this.toObject() // to deal with js functions of objects like (delete)
    deleted.forEach(d => delete userData[d])
    return userData
}

userSchema.pre("save", async function(){
    // console.log(this) // this => userData.save()
    const userData = this
    if(userData.isModified("password"))
        userData.password = await bcryptjs.hash(userData.password, 10)
})

userSchema.statics.login = async(email, password)=>{
    const userData = await User.findOne({email})
    if(!userData) throw new Error("invalid email")
    const matched = await bcryptjs.compare(password, userData.password)
    if(!matched) throw new Error("invalid password")
    return userData
}

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model("User", userSchema)
module.exports = User