import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Furniture',
    description: 'Name of the product',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 1,
    description: 'Category ID of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({
    example: 'About furniture',
    description: 'Description of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1000,
    description: 'Price of the product',
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: [
      'https://www.example.com/image1.png',
      'https://www.example.com/image2.png',
    ],
    description: 'Array of product images',
  })
  @IsArray()
  // @IsUrl() // Har bir element URL formatida bo'lishini tekshiradi
  image: string[];

  @ApiProperty({
    example: ['white', 'black'],
    description: 'Array of product colors',
  })
  @IsArray()
  @IsString({ each: true }) // Har bir element string bo'lishi kerak
  color: string[];

  @ApiProperty({
    example: 10,
    description: 'Stock of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @ApiProperty({
    example: 4.5,
    description: 'Average rating of the product',
  })
  @IsNumber()
  @IsPositive()
  average_rating: number;

  @ApiProperty({
    example: 'SKU001',
    description: 'SKU of the product',
  })
  @IsString()
  sku: string;

  @ApiProperty({
    example: 'Additional information about the product',
    description: 'Additional info of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  additional_info?: string;

  @ApiProperty({
    example: ['furniture', 'modern', 'white'],
    description: 'Array of product tags',
  })
  @IsArray()
  @IsString({ each: true }) // Har bir element string bo'lishi kerak
  tags: string[];
}
