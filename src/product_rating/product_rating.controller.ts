import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductRatingService } from './product_rating.service';
import { CreateProductRatingDto } from './dto/create-product_rating.dto';
import { UpdateProductRatingDto } from './dto/update-product_rating.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product_Rating')
@Controller('product-rating')
export class ProductRatingController {
  constructor(private readonly productRatingService: ProductRatingService) {}

  @Post('create')
  @ApiOperation({ summary: 'Creating product_rating' })
  @ApiResponse({ status: 201, description: 'Product_rating create' })
  create(@Body() createProductRatingDto: CreateProductRatingDto) {
    return this.productRatingService.create(createProductRatingDto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all product_rating' })
  @ApiResponse({ status: 201, description: 'Get All product_rating ' })
  findAll() {
    return this.productRatingService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get find product_rating' })
  @ApiResponse({ status: 201, description: 'Get Find Product_Comment ' })
  findOne(@Param('id') id: string) {
    return this.productRatingService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update product_rating ' })
  @ApiResponse({ status: 201, description: 'Update product_rating' })
  update(
    @Param('id') id: string,
    @Body() updateProductRatingDto: UpdateProductRatingDto,
  ) {
    return this.productRatingService.update(+id, updateProductRatingDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete product_rating' })
  @ApiResponse({ status: 201, description: 'Delete Product_Rating' })
  remove(@Param('id') id: string) {
    return this.productRatingService.remove(+id);
  }
}
