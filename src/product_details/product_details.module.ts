import { Module } from '@nestjs/common';
import { ProductDetailsService } from './product_details.service';
import { ProductDetailsController } from './product_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductDetail } from './models/product_detail.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductDetail])],
  controllers: [ProductDetailsController],
  providers: [ProductDetailsService],
})
export class ProductDetailsModule {}
