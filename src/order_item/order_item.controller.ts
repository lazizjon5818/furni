import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post('create')
  @ApiOperation({ summary: 'Creating order ' })
  @ApiResponse({ status: 201, description: 'Order creating success.' })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all order ' })
  @ApiResponse({ status: 201, description: 'Get All Order ' })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get find order ' })
  @ApiResponse({ status: 201, description: 'Get Find Order ' })
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update order ' })
  @ApiResponse({ status: 201, description: 'Updating order' })
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(+id, updateOrderItemDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete order ' })
  @ApiResponse({ status: 201, description: 'Delete Order' })
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}
