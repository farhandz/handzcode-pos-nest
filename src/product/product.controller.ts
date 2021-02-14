import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.interface';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  getData(
    @Query('data') data: string,
    @Query('sort') sort: string,
  ): Observable<Product[]> {
    return from(this.productService.getDataProduct(data, sort));
  }
  @Post('')
  insertData(@Body() product: Product): Observable<Product> {
    return this.productService.insertDataProduct(product);
  }
  @Put(':id')
  updateData(
    @Body() product: Product,
    @Param('id') id: string,
  ): Observable<Product> {
    return from(this.productService.updateDataProducct(id, product));
  }

  @Delete(':id')
  DeleteData(@Param('id') id: string): Observable<any> {
    return from(this.productService.deleteOne(id));
  }

  @Get(':id')
  getDataOne(@Param('id') id: string): Observable<Product> {
    return from(this.productService.dataDetail(id));
  }
}
