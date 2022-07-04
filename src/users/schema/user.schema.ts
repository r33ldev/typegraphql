import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import { IsEmail, MinLength,MaxLength } from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";


// @pre<User>('save', function(){
//     if(!this.isModified('password')) return 
//     const salt = await bcrypt.genSalt(10)
// })
@ObjectType()
export class User {
    @Field()
    _id: string;

    @Field(() => String)
    @prop({required: true})
    name: string;

    @Field(() => String)
    @prop({required: true})
    email: string;
        
    @prop({required: true})
    password: string;
}

@InputType()
export class createUserInput {
    @Field(() => String)
    name: string;
   
    @Field(() => String)
    @IsEmail()
    email: string;
    
    @Field(() => String)
    @MinLength(6, {
        message: "Password must be at least 6 characters long"
    })
    @MaxLength(50, {
        message: "Password must not exceed 50 characters"
    })
    password: string;
}


export const UserModel =  getModelForClass(User)
