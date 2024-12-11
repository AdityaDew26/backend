import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        requierd:true,
    },
    email:{
        type:String,
        requierd:true,
        match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    password:{
        type:String,
        requierd:true,
    },
})

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model("User",UserSchema);

export default User;
