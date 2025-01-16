import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';
import { ProductDetailsService } from './product_details.service';
import { Public } from 'src/common/decorators';

@UseGuards(AdminGuard)
@Controller('product-details')
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}

  @ApiOperation({ summary: 'Creating product detail' })
  @ApiResponse({
    status: 201,
    description: 'Create product detail',
    type: Object,
  })
  @Post('create')
  create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.productDetailsService.create(createProductDetailDto);
  }

  @ApiOperation({ summary: 'get all product details' })
  @ApiResponse({
    status: 200,
    description: 'get all product details',
    type: Object,
  })
  @Public()
  @Get('get')
  findAll() {
    return this.productDetailsService.findAll();
  }

  @ApiOperation({ summary: 'get 1 product detail' })
  @ApiResponse({
    status: 200,
    description: 'get 1 product detail',
    type: Object,
  })
  @Public()
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.productDetailsService.findOne(+id);
  }

  @ApiOperation({ summary: 'update product detail' })
  @ApiResponse({
    status: 200,
    description: 'update product detail',
    type: Object,
  })
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ) {
    return this.productDetailsService.update(+id, updateProductDetailDto);
  }

  @ApiOperation({ summary: 'delete product detail' })
  @ApiResponse({
    status: 200,
    description: 'delete product detail',
    type: Object,
  })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productDetailsService.remove(+id);
  }
}
