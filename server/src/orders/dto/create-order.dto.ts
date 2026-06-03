import { ProductColor, ProductSize } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested, ArrayMinSize } from "class-validator";


export class CreateOrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsEnum(ProductColor)
    color!: ProductColor;

    @IsEnum(ProductSize)
    size!: ProductSize;

    @IsInt()
    @Min(1)
    quantity!: number;

    @IsOptional()
    @IsString()
    note?: string;
}

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    customerName!: string;

    @IsEmail()
    @IsNotEmpty()
    customerEmail!: string;

    @IsString()
    @IsNotEmpty()
    customerPhone!: string;

    @IsString()
    @IsNotEmpty()
    customerAddress!: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items!: CreateOrderItemDto[];
}