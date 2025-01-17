import { Module } from '@nestjs/common';
import { ProductDetailsService } from './product_details.service';
import { ProductDetailsController } from './product_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductDetail } from './models/product_detail.model';
import { ProductModule } from 'src/product/product.module';
import { Product } from 'src/product/models/product.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductDetail, Product]), // ProductDetail va Product modellarini ulash
    ProductModule, // ProductModule ni import qilish
  ],
  controllers: [ProductDetailsController],
  providers: [ProductDetailsService],
  exports: [ProductDetailsService], // Boshqa modullarda foydalanish uchun eksport qilish
})
export class ProductDetailsModule {}
