import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';
import { ProductDetail } from './models/product_detail.model';
import { Product } from '../product/models/product.model';
import { Op } from 'sequelize';
import { PaginationDto } from 'src/admin/dto/pagination.dto';
import { createApiResponse } from '../common/utils';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectModel(ProductDetail)
    private readonly productDetailModel: typeof ProductDetail,
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  /**
   * Create a new product detail
   * @param createProductDetailDto
   * @returns Created product detail
   */
  async create(createProductDetailDto: CreateProductDetailDto) {
    // Check if the product exists
    const product = await this.productModel.findOne({
      where: { id: createProductDetailDto.productId },
    });
    if (!product) {
      throw new NotFoundException(
        `Product with ID ${createProductDetailDto.productId} not found`,
      );
    }

    // Create and save the product detail
    const newProductDetail = await this.productDetailModel.create(
      createProductDetailDto,
    );

    return createApiResponse(201, 'Product detail created successfully', {
      newProductDetail,
    });
  }

  /**
   * Retrieve all product details with optional filtering, sorting, and pagination
   * @param query Pagination and filtering options
   * @returns List of product details with pagination metadata
   */
  async findAll(query: PaginationDto) {
    const { filter, order = 'asc', page = 1, limit = 10 } = query;

    const offset = (page - 1) * limit;

    // Build the filtering condition
    const where = filter
      ? {
          [Op.or]: [
            { model_number: { [Op.like]: `%${filter}%` } },
            { material: { [Op.like]: `%${filter}%` } },
          ],
        }
      : {};

    // Retrieve product details with filtering, sorting, and pagination
    const { rows: productDetails, count: total } =
      await this.productDetailModel.findAndCountAll({
        where,
        include: { all: true },
        order: [['productId', order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
        offset,
        limit,
      });

    return createApiResponse(200, 'Product details retrieved successfully', {
      productDetails,
      total,
      page,
      limit,
    });
  }

  /**
   * Retrieve a product detail by ID
   * @param id
   * @returns Found product detail
   * @throws NotFoundException
   */
  async findOne(id: number) {
    const productDetail = await this.productDetailModel.findOne({
      where: { id },
      include: { all: true },
    });

    if (!productDetail) {
      throw new NotFoundException(`Product detail with ID ${id} not found`);
    }

    return createApiResponse(200, 'Product detail retrieved successfully', {
      productDetail,
    });
  }

  /**
   * Update a product detail by ID
   * @param id
   * @param updateProductDetailDto
   * @returns Updated product detail
   * @throws NotFoundException
   */
  async update(id: number, updateProductDetailDto: UpdateProductDetailDto) {
    const existingProductDetail = await this.productDetailModel.findOne({
      where: { id },
    });

    if (!existingProductDetail) {
      throw new NotFoundException(`Product detail with ID ${id} not found`);
    }

    await this.productDetailModel.update(updateProductDetailDto, {
      where: { id },
    });

    const updatedProductDetail = await this.productDetailModel.findOne({
      where: { id },
    });

    return createApiResponse(200, 'Product detail updated successfully', {
      updatedProductDetail,
    });
  }

  /**
   * Delete a product detail by ID
   * @param id
   * @returns Deletion confirmation
   * @throws NotFoundException
   */
  async remove(id: number) {
    const productDetail = await this.productDetailModel.findOne({
      where: { id },
    });

    if (!productDetail) {
      throw new NotFoundException(`Product detail with ID ${id} not found`);
    }

    await this.productDetailModel.destroy({
      where: { id },
    });

    return createApiResponse(
      200,
      `Product detail with ID ${id} removed successfully`,
    );
  }
}
