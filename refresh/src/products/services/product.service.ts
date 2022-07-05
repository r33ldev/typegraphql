import { User } from 'src/users/schema/user.schema';
import { createProductInput,findProductInput,  ProductModel } from './../schema/product.schema';


export class ProductService {
    async createProduct(input: createProductInput & {user: User['_id']}) {
        const product = await ProductModel.create(input);
        return product;
    }
    async findProduct() {
        // pagination logic goes here
        return ProductModel.find().lean()
    }

    async findSingleProduct(input: findProductInput) {
        return ProductModel.findOne(input).lean()
    }
}