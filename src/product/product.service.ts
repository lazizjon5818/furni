import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  /**
   * Mahsulot yaratish
   * @param createProductDto
   * @returns Yangi yaratilgan mahsulot
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productModel.create(createProductDto);
  }

  /**
   * Hamma mahsulotlarni olish
   * @returns Hamma mahsulotlar va ularning umumiy soni
   */
  async findAll(): Promise<{ products: Product[]; total: number }> {
    const { rows: products, count: total } =
      await this.productModel.findAndCountAll({ include: { all: true } });
    return { products, total };
  }

  /**
   * ID bo'yicha mahsulotni olish
   * @param id
   * @returns Mahsulot yoki xato
   */
  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!product) {
      throw new NotFoundException(`Mahsulot ID ${id} topilmadi`);
    }
    return product;
  }

  /**
   * Mahsulotni yangilash
   * @param id
   * @param updateProductDto
   * @returns Yangilangan mahsulot yoki xato
   */
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const [affectedRows, updatedProducts] = await this.productModel.update(
      updateProductDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Mahsulot ID ${id} topilmadi`);
    }

    return updatedProducts[0];
  }

  /**
   * Mahsulotni o'chirish
   * @param id
   * @returns Xabar yoki xato
   */
  async remove(id: number): Promise<void> {
    const deletedRows = await this.productModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new NotFoundException(`Mahsulot ID ${id} topilmadi`);
    }
  }
}
