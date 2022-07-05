// create a product model typegoose
import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { User } from 'src/users/schema/user.schema';
import { Field, ObjectType, InputType } from 'type-graphql';
import { customAlphabet } from 'nanoid';


const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

@ObjectType()
@index({ productId: 1 })
export class Product {
  @Field()
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true })
  price: string;

  @Field(() => String)
  @prop({ required: true })
  image: string;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  createdBy: Ref<User>;

  @Field(() => String)
  @prop({ required: true, default: () => `product_${nanoid()}, unique:true` })
  productId: string;
}

export const ProductModel = getModelForClass<typeof Product>(Product);


@InputType()
export class createProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  price: string;

  @Field(() => String)
  image: string;
}
@InputType()
export class findProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  price: string;

  @Field(() => String)
  image: string;
}