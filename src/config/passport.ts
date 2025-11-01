import passport from 'passport'
import { Strategy, ExtractJwt} from 'passport-jwt'
import { type IPayload } from '../interfaces/types.js'
import User from '../models/user.js'

const secret = process.env.JWT_SECRET

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret!
}

const strategy = new Strategy(options, async (payload: IPayload, done) => {
    try{
        const user = await User.findById(payload.id).select('-password')

        if(!user){
            return done(null, false)
        }

        done(null, user)
    }
    catch(error){
        console.log(error)
        return done(error, false)
    }
})

passport.use(strategy)

export default passport

