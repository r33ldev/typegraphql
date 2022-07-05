import { User, createUserInput, loginInput } from './../schema/user.schema';
import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import UserService from '../services/user.service';
import { Context } from '../../types/context';

@Resolver(() => User)
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }
  @Mutation(() => User)
  createUser(@Arg('input') input: createUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String) //jwt string token
  login(@Arg('input') input: loginInput, @Ctx() ctx: Context) {
    return this.userService.login(input, ctx);
  }

  @Query(() => User)
  me(@Ctx() ctx: Context) {
    return ctx.user;
  }
}
