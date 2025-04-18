import bcrypt from "bcryptjs";
import moment from "moment";
import jwt from "jsonwebtoken";
import { envConfigs } from "../config/envconfig";
import { TokenTypes } from "../enums";
import Constants from "./contants";

export const hashString = (contact:string|number,otp:number|string)=>{
    return `NET_WORTH: ${contact}:${otp}`;
}

export const verifyOtpHash = (hash:string,contact:string,otp:string)=>{
    const decryptedString = hashString(contact,otp);
    return bcrypt.compareSync(decryptedString,hash);
}

export const otpToken = (email:string,otp:number)=>{
    const saltRounds = 10;
    const decryptedString = hashString(email,otp);
    const encryptedString = bcrypt.hashSync(decryptedString,saltRounds);
    const signObj = {
        otp:encryptedString,
        email,
        type: TokenTypes.ACCESS,
    }
    const expireTime = moment.duration(Constants.otpExpireDurationInMin, 'minutes').asMilliseconds();
    const token = jwt.sign(signObj,envConfigs.jwtsecret,{expiresIn:`${expireTime}`});
    return token;
}

export const Random = async()=>{
    try {
      return Math.floor(100000 + Math.random() * 900000);
    } catch (error) {
      throw new Error(error);
    }
  }