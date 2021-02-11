import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.interface';
import { Observable, from } from 'rxjs';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Pulsa') private readonly productModel: Model<Product>,
  ) {}

  getDataProduct(): Observable<Product[]> {
    return from(this.productModel.find());
  }
  insertDataProduct(product: Product): Observable<Product> {
    return from(this.productModel.create(product));
  }
}
