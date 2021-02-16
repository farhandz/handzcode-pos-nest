import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Observable, from } from 'rxjs';
import { Category } from './category.interface';
import { JwtAuthGuard } from 'src/guard/jwt-guard';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('')
  getDataCategory(): Observable<Category[]> {
    return from(this.categoryService.getData());
  }

  // admin only can access this method
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  addDataCategory(@Body() category: Category): Observable<Category> {
    return from(this.categoryService.insertData(category));
  }
  // admin only can access this method
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  editData(
    @Param('id') id: string,
    @Body() category: Category,
  ): Observable<Category> {
    return from(this.categoryService.editData(id, category));
  }
  // admin only can access this method
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  DeleteData(@Param('id') id: string): Observable<any> {
    return from(this.categoryService.DeleteData(id));
  }
}
