import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
// import { ProductCategory } from "../../product_category/models/product_category.model";
// import { Customer } from "../../customer/models/customer.model";
// import { ProductRating } from "../../product_rating/models/product_rating.model";
// import { ProductComment } from "../../product_comment/models/product_comment.model";
// import { CartItem } from "../../cart_item/models/cart_item.model";
// import { OrderItem } from "../../order_item/models/order_item.model";

interface IProductCreationAttr {
  title: string;
  categoryId: number;
  description?: string;
  price: number;
  image: string[];
  color: string[];
  stock?: number;
  average_rating: number;
  sku: string;
  additional_info: string;
  tags: string[];
}

@Table({ tableName: 'product', timestamps: true }) // timestamps: createdAt, updatedAt
export class Product extends Model<Product, IProductCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Product ID',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Furniture',
    description: 'Name of the product',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 1,
    description: 'Category ID of the product',
  })
  // @ForeignKey(() => ProductCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  categoryId: number;

  @ApiProperty({
    example: 'About furniture',
    description: 'Description of the product',
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: 1000,
    description: 'Price of the product',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: [
      'https://www.example.com/image1.png',
      'https://www.example.com/image2.png',
    ],
    description: 'Array of product images',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  image: string[];

  @ApiProperty({
    example: ['white', 'black'],
    description: 'Array of product colors',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  color: string[];

  @ApiProperty({
    example: 10,
    description: 'Stock of the product',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0, // Default qiymat
  })
  stock: number;

  @ApiProperty({
    example: 4.5,
    description: 'Average rating of the product',
  })
  @Column({
    type: DataType.DECIMAL(2, 1),
    allowNull: false,
    defaultValue: 0.0, // Default qiymat
  })
  average_rating: number;

  @ApiProperty({
    example: 'SKU001',
    description: 'SKU of the product',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true, // Yagona qiymat
  })
  sku: string;

  @ApiProperty({
    example: 'Additional information about the product',
    description: 'Additional info of the product',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  additional_info: string;

  @ApiProperty({
    example: ['furniture', 'modern', 'white'],
    description: 'Array of product tags',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  tags: string[];

  // Add other relevant fields and relationships here
  // @BelongsTo(() => ProductCategory)
  // product_category: ProductCategory;

  // @HasMany(() => ProductRating)
  // product_ratings: ProductRating[];

  // @HasMany(() => ProductComment)
  // product_comments: ProductComment[];

  // @HasMany(() => CartItem)
  // cart_items: CartItem[];

  // @HasMany(() => OrderItem)
  // order_items: OrderItem[];
}
