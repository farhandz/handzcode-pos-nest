import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from '../model/category.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
