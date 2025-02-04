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
  @IsString({ message: 'The title must be a string.' })
  title: string;

  @ApiProperty({
    example: 1,
    description: 'Category ID of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'The categoryId must be a number.' })
  categoryId?: number;

  @ApiProperty({
    example: 'About furniture',
    description: 'Description of the product',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'The description must be a string.' })
  description?: string;

  @ApiProperty({
    example: 1000,
    description: 'Price of the product',
  })
  @IsNumber({}, { message: 'The price must be a number.' })
  @IsPositive({ message: 'The price must be a positive number.' })
  price: number;

  @ApiProperty({
    example: [
      'https://www.example.com/image1.png',
      'https://www.example.com/image2.png',
    ],
    description: 'Array of product images',
  })
  @IsArray({ message: 'The image must be an array.' })
  @IsUrl({}, { each: true, message: 'Each image must be a valid URL.' }) // Har bir elementni URL formatida tekshiradi
  image: string[];

  @ApiProperty({
    example: ['white', 'black'],
    description: 'Array of product colors',
  })
  @IsArray({ message: 'The color must be an array.' })
  @IsString({ each: true, message: 'Each color must be a string.' }) // Har bir elementni string formatida tekshiradi
  color: string[];

  @ApiProperty({
    example: 10,
    description: 'Stock of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'The stock must be a number.' })
  @IsPositive({ message: 'The stock must be a positive number.' })
  stock?: number;

  @ApiProperty({
    example: 4.5,
    description: 'Average rating of the product',
  })
  @IsNumber({}, { message: 'The average rating must be a number.' })
  @IsPositive({ message: 'The average rating must be a positive number.' })
  average_rating: number;

  @ApiProperty({
    example: 'SKU001',
    description: 'SKU of the product',
  })
  @IsString({ message: 'The SKU must be a string.' })
  sku: string;

  @ApiProperty({
    example: 'Additional information about the product',
    description: 'Additional info of the product',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'The additional info must be a string.' })
  additional_info?: string;

  @ApiProperty({
    example: ['furniture', 'modern', 'white'],
    description: 'Array of product tags',
  })
  @IsArray({ message: 'The tags must be an array.' })
  @IsString({ each: true, message: 'Each tag must be a string.' }) // Har bir elementni string formatida tekshiradi
  tags: string[];
}
