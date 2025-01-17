import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @ApiOperation({ summary: 'Creating order ' })
  @ApiResponse({ status: 201, description: 'Order create' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all order ' })
  @ApiResponse({ status: 201, description: 'Get All Order' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get find order' })
  @ApiResponse({ status: 201, description: 'Get Find Order' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 201, description: 'Update order' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete order ' })
  @ApiResponse({ status: 201, description: 'Delete Order' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
