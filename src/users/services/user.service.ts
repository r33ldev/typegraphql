import { signJWT } from 'src/utils/jwt';
import { ApolloError } from 'apollo-server';
import { Context } from '../../types/context';
import {
  createUserInput,
  loginInput,
  UserModel,
} from './../schema/user.schema';
import bcrypt from 'bcrypt';

class UserService {
  async createUser(input: createUserInput) {
    return UserModel.create(input);
  }
  async login(input: loginInput, ctx: Context) {
    const err = 'Invalid email or password';
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (!user) throw new ApolloError(err);
    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) throw new ApolloError(err);
    const token = signJWT(user);
    
    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      });
    // const token = await ctx.req.user.generateToken();
    return token;
  }
}

export default UserService;
