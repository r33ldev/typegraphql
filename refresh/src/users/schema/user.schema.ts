import {
  getModelForClass,
  prop,
  pre,
  ReturnModelType,
  queryMethod,
  index,
} from '@typegoose/typegoose';
import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { Field, ObjectType, InputType } from 'type-graphql';
import bcrypt from 'bcrypt';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email });
}
interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}
@pre<User>('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})
@index({ email: 1 }, { unique: true })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;
  
  // @Field(() => String)
  @prop({ required: true })
  password: string;
}
export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class createUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @MaxLength(50, {
    message: 'Password must not exceed 50 characters',
  })
  password: string;
}
@InputType()
export class loginInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;
}

