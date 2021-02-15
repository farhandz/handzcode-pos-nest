import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.interface';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  getDataProduct(data: string, sort: string): Observable<Product[]> {
    return !data
      ? from(
          this.productModel
            .find()
            .populate({ path: 'categoryid', select: 'category' }),
        )
      : from(
          this.productModel
            .find({ name: { $regex: '.*' + data + '.*' } })
            .populate({ path: 'categoryid', select: 'category' })
            .sort(
              sort === 'termurah'
                ? { price: 1 }
                : sort === 'termahal'
                ? { price: 1 }
                : {},
            ),
        );
  }
  insertDataProduct(product: Product): Observable<Product> {
    return from(this.productModel.create(product));
  }

  updateDataProducct(id: string, product: Product): Observable<Product> {
    return from(
      this.productModel.findByIdAndUpdate(id, product, { new: true }),
    );
  }

  deleteOne(id: string): Observable<any> {
    return from(this.productModel.deleteOne({ _id: id })).pipe(
      map((data: any) => {
        return {
          message: 'sukses delete data',
          data,
        };
      }),
    );
  }

  dataDetail(id: string): Observable<Product> {
    return from(this.productModel.findById(id)).pipe(
      map((data: Product) => {
        return data;
      }),
    );
  }
}
