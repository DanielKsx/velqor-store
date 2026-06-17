import { ArrayMinSize, IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProductCategory, ProductColor, ProductSize } from "@prisma/client";

class CreateProductImageDto {
    @IsString()
    @IsNotEmpty()
    url!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    alt!: string;

    @IsInt()
    @Min(1)
    order!: number;
}

class CreateProductVariantDto {
    @IsEnum(ProductColor)
    color!: ProductColor;

    @IsEnum(ProductSize)
    size!: ProductSize;

    @IsInt()
    @Min(0)
    stock!: number;
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    sku!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    slug!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description!: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    price!: number;

    @IsEnum(ProductCategory)
    category!: ProductCategory;

    @IsString()
    @IsNotEmpty()
    mainImage!: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateProductImageDto)
    images!: CreateProductImageDto[];

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateProductVariantDto)
    variants!: CreateProductVariantDto[];
}

