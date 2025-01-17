import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  IsPositive,
} from 'class-validator';

export class CreateProductDetailDto {
  @ApiProperty({
    example: 1,
    description: 'Product ID to which the details belong',
  })
  @IsInt({ message: 'Product ID must be an integer.' })
  @IsPositive({ message: 'Product ID must be a positive number.' })
  readonly productId: number;

  @ApiProperty({ example: 50.5, description: 'Width of the product (in cm)' })
  @IsOptional()
  @IsNumber({}, { message: 'Width must be a number.' })
  @IsPositive({ message: 'Width must be a positive number.' })
  readonly width?: number;

  @ApiProperty({ example: 120.3, description: 'Height of the product (in cm)' })
  @IsOptional()
  @IsNumber({}, { message: 'Height must be a number.' })
  @IsPositive({ message: 'Height must be a positive number.' })
  readonly height?: number;

  @ApiProperty({ example: 40.0, description: 'Depth of the product (in cm)' })
  @IsOptional()
  @IsNumber({}, { message: 'Depth must be a number.' })
  @IsPositive({ message: 'Depth must be a positive number.' })
  readonly depth?: number;

  @ApiProperty({ example: 10.5, description: 'Weight of the product (in kg)' })
  @IsOptional()
  @IsNumber({}, { message: 'Weight must be a number.' })
  @IsPositive({ message: 'Weight must be a positive number.' })
  readonly weight?: number;

  @ApiProperty({
    example: 'MDL123',
    description: 'Model number of the product',
  })
  @IsOptional()
  @IsString({ message: 'Model number must be a string.' })
  @MaxLength(100, {
    message: 'Model number must not exceed 100 characters.',
  })
  readonly model_number?: string;

  @ApiProperty({
    example: 'Wood',
    description: 'Material used for the product',
  })
  @IsOptional()
  @IsString({ message: 'Material must be a string.' })
  @MaxLength(100, { message: 'Material must not exceed 100 characters.' })
  readonly material?: string;

  @ApiProperty({
    example: 'Single Seater',
    description: 'Configuration of the product',
  })
  @IsOptional()
  @IsString({ message: 'Configuration must be a string.' })
  @MaxLength(100, {
    message: 'Configuration must not exceed 100 characters.',
  })
  readonly configuration?: string;

  @ApiProperty({
    example: 'Leather',
    description: 'Upholstery material of the product',
  })
  @IsOptional()
  @IsString({ message: 'Upholstery material must be a string.' })
  @MaxLength(100, {
    message: 'Upholstery material must not exceed 100 characters.',
  })
  readonly upholstery_material?: string;

  @ApiProperty({
    example: 'Foam',
    description: 'Filling material of the product',
  })
  @IsOptional()
  @IsString({ message: 'Filling material must be a string.' })
  @MaxLength(100, {
    message: 'Filling material must not exceed 100 characters.',
  })
  readonly filling_material?: string;

  @ApiProperty({
    example: 150,
    description: 'Maximum load capacity of the product (in kg)',
  })
  @IsOptional()
  @IsInt({ message: 'Maximum load capacity must be an integer.' })
  @IsPositive({
    message: 'Maximum load capacity must be a positive number.',
  })
  readonly max_load_capacity?: number;

  @ApiProperty({
    example: 'India',
    description: 'Country of origin for the product',
  })
  @IsOptional()
  @IsString({ message: 'Country of origin must be a string.' })
  @MaxLength(100, {
    message: 'Country of origin must not exceed 100 characters.',
  })
  readonly origin_country?: string;

  @ApiProperty({
    example: '2 years warranty',
    description: 'Summary of the product warranty',
  })
  @IsOptional()
  @IsString({ message: 'Warranty summary must be a string.' })
  @MaxLength(200, {
    message: 'Warranty summary must not exceed 200 characters.',
  })
  readonly warranty_summary?: string;
}
