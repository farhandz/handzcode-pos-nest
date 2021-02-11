import { Controller, Get, Post, Body } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.interface';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  getData(): Observable<Product[]> {
    return from(this.productService.getDataProduct());
  }
  @Post('')
  insertData(@Body() product: Product): Observable<Product> {
    return this.productService.insertDataProduct(product);
  }
}
