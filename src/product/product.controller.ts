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
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  getData(
    @Query('data') data: string,
    @Query('sort') sort: string,
    @Query('category') category: string,
  ): Observable<Product[]> {
    console.log(category);
    return from(this.productService.getDataProduct(data, sort, category));
  }

  // admin only can access this method
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  insertData(@Body() product: Product): Observable<Product> {
    return this.productService.insertDataProduct(product);
  }

  // admin only can access this method
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateData(
    @Body() product: Product,
    @Param('id') id: string,
  ): Observable<Product> {
    return from(this.productService.updateDataProducct(id, product));
  }

  // admin only can access this method
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  DeleteData(@Param('id') id: string): Observable<any> {
    return from(this.productService.deleteOne(id));
  }

  // admin only can access this method
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  getDataOne(@Param('id') id: string): Observable<Product> {
    return from(this.productService.dataDetail(id));
  }
}
