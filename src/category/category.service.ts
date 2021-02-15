import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.interface';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly productModel: Model<Category>,
  ) {}

  getData(): Observable<Category[]> {
    return from(this.productModel.find()).pipe(
      map((category: Category[]) => {
        return category;
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }

  insertData(category: Category): Observable<Category> {
    return from(this.productModel.create(category)).pipe(
      map((category: Category) => {
        return category;
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }

  editData(id: string, category: Category): Observable<Category> {
    return from(
      this.productModel.findByIdAndUpdate(id, category, { new: true }),
    );
  }

  DeleteData(id: string): Observable<any> {
    return from(this.productModel.deleteOne({ _id: id })).pipe(
      map((category: any) => {
        return category;
      }),
      catchError((e) => {
        throw new HttpException(e.message, 500);
      }),
    );
  }
}
