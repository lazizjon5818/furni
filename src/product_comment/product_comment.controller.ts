import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductCommentService } from './product_comment.service';
import { CreateProductCommentDto } from './dto/create-product_comment.dto';
import { UpdateProductCommentDto } from './dto/update-product_comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product_Comment')
@Controller('product-comment')
export class ProductCommentController {
  constructor(private readonly productCommentService: ProductCommentService) {}

  @Post('create')
  @ApiOperation({ summary: 'Creating product_comment' })
  @ApiResponse({ status: 201, description: 'Product_comment create' })
  create(@Body() createProductCommentDto: CreateProductCommentDto) {
    return this.productCommentService.create(createProductCommentDto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all product_comment ' })
  @ApiResponse({ status: 201, description: 'Get All product_comment ' })
  findAll() {
    return this.productCommentService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get find product_comment ' })
  @ApiResponse({ status: 201, description: 'Get Find Product_Comment ' })
  findOne(@Param('id') id: string) {
    return this.productCommentService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update product_comment ' })
  @ApiResponse({ status: 201, description: 'Update product_comment ' })
  update(
    @Param('id') id: string,
    @Body() updateProductCommentDto: UpdateProductCommentDto,
  ) {
    return this.productCommentService.update(+id, updateProductCommentDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete product_comment ' })
  @ApiResponse({ status: 201, description: 'Delete Product_Comment' })
  remove(@Param('id') id: string) {
    return this.productCommentService.remove(+id);
  }
}
