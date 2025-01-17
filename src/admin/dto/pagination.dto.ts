import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Filter string for searching by title or description',
    required: false,
  })
  @IsOptional()
  readonly filter?: string;

  @ApiProperty({
    description: 'Sorting order: asc or desc',
    required: false,
    example: 'asc',
  })
  @IsOptional()
  readonly order?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number) // Automatically convert query string to number
  @IsNumber({}, { message: 'page must be a number' })
  @Min(1, { message: 'page must be at least 1' })
  readonly page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number) // Automatically convert query string to number
  @IsNumber({}, { message: 'limit must be a number' })
  @Min(1, { message: 'limit must be at least 1' })
  readonly limit?: number;
}
