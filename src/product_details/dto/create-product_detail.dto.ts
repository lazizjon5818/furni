import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDetailDto {
  @ApiProperty({
    example: 1,
    description: 'Product ID to which the details belong',
  })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 50.5, description: 'Width of the product (in cm)' })
  @IsOptional()
  @IsNumber()
//   @IsDecimal()
  width?: number;

  @ApiProperty({ example: 120.3, description: 'Height of the product (in cm)' })
  @IsOptional()
  @IsNumber()
//   @IsDecimal()
  height?: number;

  @ApiProperty({ example: 40.0, description: 'Depth of the product (in cm)' })
  @IsOptional()
  @IsNumber()
//   @IsDecimal()
  depth?: number;

  @ApiProperty({ example: 10.5, description: 'Weight of the product (in kg)' })
  @IsOptional()
  @IsNumber()
//   @IsDecimal()
  weight?: number;

  @ApiProperty({
    example: 'MDL123',
    description: 'Model number of the product',
  })
  @IsOptional()
  @IsString()
  model_number?: string;

  @ApiProperty({
    example: 'Wood',
    description: 'Material used for the product',
  })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiProperty({
    example: 'Single Seater',
    description: 'Configuration of the product',
  })
  @IsOptional()
  @IsString()
  configuration?: string;

  @ApiProperty({
    example: 'Leather',
    description: 'Upholstery material of the product',
  })
  @IsOptional()
  @IsString()
  upholstery_material?: string;

  @ApiProperty({
    example: 'Foam',
    description: 'Filling material of the product',
  })
  @IsOptional()
  @IsString()
  filling_material?: string;

  @ApiProperty({
    example: 150,
    description: 'Maximum load capacity of the product (in kg)',
  })
  @IsOptional()
  @IsInt()
  max_load_capacity?: number;

  @ApiProperty({
    example: 'India',
    description: 'Country of origin for the product',
  })
  @IsOptional()
  @IsString()
  origin_country?: string;

  @ApiProperty({
    example: '2 years warranty',
    description: 'Summary of the product warranty',
  })
  @IsOptional()
  @IsString()
  warranty_summary?: string;
}
