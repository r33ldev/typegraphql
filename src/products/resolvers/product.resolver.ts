import { Context } from 'src/types/context';
import {
  Product,
  createProductInput,
  findProductInput,
} from './../schema/product.schema';
import { Arg, Authorized, Ctx, Mutation, Query } from 'type-graphql';
import { ProductService } from './../services/product.service';
export class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Authorized()
  @Mutation(() => Product)
  async createProduct(
    @Arg('input') input: createProductInput,
    @Ctx() ctx: Context
  ) {
    const user = ctx.user!;
    return this.productService.createProduct({ ...input, user: user?._id });
  }

  @Query(() => Product)
  async findProduct() {
    return this.productService.findProduct();
  }

  @Query(() => Product)
  async findAProduct(@Arg('input') input: findProductInput) {
    return this.productService.findSingleProduct(input);
  }
}
