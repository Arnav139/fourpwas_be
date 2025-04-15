import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import moment from 'moment';
import jwt from "jsonwebtoken";
import { envConfigs } from './envconfig';
import { TokenTypes } from '../enums';

export const generateAuthTokens = (userId:any ) => {
  const accessTokenExpires = moment().add(
    envConfigs.accessExpirationMinutes,
    "minutes"
  );
  console.log(accessTokenExpires , "access token expires")
  const accessToken = jwt.sign(JSON.stringify({
    userId: userId,
    type: TokenTypes.ACCESS, // Include the token type
    exp: accessTokenExpires.unix() // Set expiration time in UNIX timestamp format
  }), envConfigs.jwtsecret);
  console.log(userId , "access token")
  return accessToken;
}

const jwtOptions = {
  secretOrKey: envConfigs.jwtsecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    console.log(payload ,"payloadddd")
    if (payload.type !== TokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    done(null, payload);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);