import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';
import { ProductDetail } from './models/product_detail.model';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectModel(ProductDetail)
    private readonly productDetailModel: typeof ProductDetail,
  ) {}

  /**
   * Yangi mahsulot detallari yaratish
   * @param createProductDetailDto
   * @returns Yaratilgan mahsulot detallari
   */
  async create(
    createProductDetailDto: CreateProductDetailDto,
  ): Promise<ProductDetail> {
    return await this.productDetailModel.create(createProductDetailDto);
  }

  /**
   * Hamma mahsulot detallari ro'yxatini olish
   * @returns Mahsulot detallari ro'yxati
   */
  async findAll(): Promise<ProductDetail[]> {
    return await this.productDetailModel.findAll({ include: { all: true } });
  }

  /**
   * ID bo'yicha mahsulot detalini olish
   * @param id
   * @returns Topilgan mahsulot detali
   * @throws NotFoundException
   */
  async findOne(id: number): Promise<ProductDetail> {
    const productDetail = await this.productDetailModel.findOne({
      where: { id },
    });
    if (!productDetail) {
      throw new NotFoundException(`Mahsulot detali ID ${id} topilmadi`);
    }
    return productDetail;
  }

  /**
   * Mahsulot detalini yangilash
   * @param id
   * @param updateProductDetailDto
   * @returns Yangilangan mahsulot detali
   * @throws NotFoundException
   */
  async update(
    id: number,
    updateProductDetailDto: UpdateProductDetailDto,
  ): Promise<ProductDetail> {
    const [affectedRows, updatedProductDetails] =
      await this.productDetailModel.update(updateProductDetailDto, {
        where: { id },
        returning: true,
      });

    if (affectedRows === 0) {
      throw new NotFoundException(`Mahsulot detali ID ${id} topilmadi`);
    }

    return updatedProductDetails[0];
  }

  /**
   * Mahsulot detalini o'chirish
   * @param id
   * @returns Xabar yoki xato
   * @throws NotFoundException
   */
  async remove(id: number): Promise<void> {
    const deletedRows = await this.productDetailModel.destroy({
      where: { id },
    });
    if (deletedRows === 0) {
      throw new NotFoundException(`Mahsulot detali ID ${id} topilmadi`);
    }
  }
}
