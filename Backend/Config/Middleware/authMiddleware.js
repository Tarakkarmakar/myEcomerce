import userModel from '../Model/userModel.js';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken'
dotenv.config();
//Protected Route by Token
export const requireSignIn= async(req, res , next)=>{
  try{
      const decode = JWT.verify (req.headers.authorization, process.env.JWT_SEC);
      console.log(req.headers.authorization)
      req.user = decode;
      next()
  }catch(err){
      console.log(err)
      res.status(401).send({
          success:false,
          err,
      })
  }
};

//Admin acess
export const isAdmin= async(req, res, next)=>{
  try{
      const user = await userModel.findById(req.user._id)
      if(user.role !== 1){
          res.status(401).send({
              sucess : false,
              msg : 'Access Denied'
          })
      }else{
          next()
      }
  }catch(err){
      console.log(err)
      res.status(401).send({
          success : false,
          err,
          msg : 'Error in Admin'
      })
  }
};