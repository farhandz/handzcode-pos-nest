import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Observable, from } from 'rxjs';
import { Category } from './category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('')
  getDataCategory(): Observable<Category[]> {
    return from(this.categoryService.getData());
  }
  @Post('')
  addDataCategory(@Body() category: Category): Observable<Category> {
    return from(this.categoryService.insertData(category));
  }
  @Put(':id')
  editData(
    @Param('id') id: string,
    @Body() category: Category,
  ): Observable<Category> {
    return from(this.categoryService.editData(id, category));
  }
  @Delete(':id')
  DeleteData(@Param('id') id: string): Observable<any> {
    return from(this.categoryService.DeleteData(id));
  }
}
