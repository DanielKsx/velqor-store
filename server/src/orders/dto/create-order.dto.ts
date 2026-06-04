import { ProductColor, ProductSize } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested, ArrayMinSize, IsUUID, Max, MaxLength, ArrayMaxSize } from "class-validator";


export class CreateOrderItemDto {
    @IsUUID()
    productId!: string;

    @IsEnum(ProductColor)
    color!: ProductColor;

    @IsEnum(ProductSize)
    size!: ProductSize;

    @IsInt()
    @Min(1)
    @Max(20)
    quantity!: number;

    @IsOptional()
    @IsString()
    @MaxLength(300)
    note?: string;
}

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    customerName!: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(200)
    customerEmail!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    customerPhone!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    customerAddress!: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items!: CreateOrderItemDto[];
}