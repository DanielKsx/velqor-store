import { Body, Controller, Post, UseGuards, Get, Delete, Param, ParseUUIDPipe, Patch } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('admin/products')
@UseGuards(JwtAuthGuard)
export class AdminProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findById(@Param('id', new ParseUUIDPipe()) id: string){
        return this.productsService.findById(id);
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto)
    }

    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe()) id: string){
        return this.productsService.remove(id);
    }

}