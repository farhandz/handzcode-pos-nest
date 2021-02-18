import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryModule } from './history/history.module';
import { UserModule } from './user/user.module';
import { TrackingResiModule } from './tracking-resi/tracking-resi.module';
import { EmployeModule } from './employe/employe.module';
import { DiscountModule } from './discount/discount.module';
import { CategoryModule } from './category/category.module';
import * as dotenv from 'dotenv';

// setup doten
dotenv.config();

@Module({
  imports: [
    AuthModule,
    ProductModule,
    MongooseModule.forRoot(process.env.DATABASE_ACCESS),
    UserModule,
    HistoryModule,
    TrackingResiModule,
    EmployeModule,
    DiscountModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
