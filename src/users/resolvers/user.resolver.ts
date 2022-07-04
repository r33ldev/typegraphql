import { User, createUserInput } from './../schema/user.schema';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UserService from '../services/user.service';

@Resolver(() => User)
export default class UserResolver {

    constructor(private userService: UserService) { 
        this.userService = new UserService()
    }
    @Mutation(() => User)
    createUser(@Arg('input') input: createUserInput){
        return this.userService.createUser(input)
    }


    @Query(() => User)
    me() {
        return {
            _id: '123',
            name: 'John Doe',
            email: 'john@doe.com'
        }
    }
}