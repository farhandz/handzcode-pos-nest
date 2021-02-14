import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.interface';
import { JwtAuthGuard } from 'src/guard/jwt-guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @UseGuards(JwtAuthGuard)
  @Get('')
  getData(
    @Query('data') data: string,
    @Query('sort') sort: string,
  ): Observable<Product[]> {
    return from(this.productService.getDataProduct(data, sort));
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  insertData(@Body() product: Product): Observable<Product> {
    return this.productService.insertDataProduct(product);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateData(
    @Body() product: Product,
    @Param('id') id: string,
  ): Observable<Product> {
    return from(this.productService.updateDataProducct(id, product));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  DeleteData(@Param('id') id: string): Observable<any> {
    return from(this.productService.deleteOne(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getDataOne(@Param('id') id: string): Observable<Product> {
    return from(this.productService.dataDetail(id));
  }
}
