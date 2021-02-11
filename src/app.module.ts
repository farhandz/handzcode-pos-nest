import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { HistoryModule } from './history/history.module';
import { TrackingResiModule } from './tracking-resi/tracking-resi.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost/handposbe'),
    UserModule,
    HistoryModule,
    TrackingResiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
