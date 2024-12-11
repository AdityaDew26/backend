
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


 export const Signup = async(req, res)=>
{

     try{
        const{username , email, password, confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({message:"password do not match"});
        }

         const existingUser = await User.findOne({email})
         if(existingUser){
             return res.status(400).json({message:"user Already exist"})
          }

         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt)

         const newUser= new User({
            username,
            email,
            password: hashedPassword,
})

await newUser.save()
const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET,{expiresIn:"1h"})
res.status(201).json({message:"user registered successfully"})
     }
     catch(error){
res.status(500).json({message:"Server Error", error: error.message})
     }
}


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });


    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// Get User Info
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Assumes `protect` middleware adds `req.user`
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};