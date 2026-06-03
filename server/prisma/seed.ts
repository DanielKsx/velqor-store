import 'dotenv/config';
import { PrismaClient, ProductCategory, ProductColor, ProductSize } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from 'bcrypt'

const databaseUrl = new URL(process.env.DATABASE_URL as string);

const adapter = new PrismaMariaDb({
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port),
    user: databaseUrl.username,
    password: decodeURIComponent(databaseUrl.password),
    database: databaseUrl.pathname.slice(1),
    allowPublicKeyRetrieval: true,
});

const prisma = new PrismaClient({ adapter });

const imageTypes = ['front', 'back', 'detail'] as const;
const colors = [
    ProductColor.BLACK,
    ProductColor.WHITE,
    ProductColor.GREY,
] as const;

const sizes = [
    ProductSize.XS,
    ProductSize.S,
    ProductSize.M,
    ProductSize.L,
    ProductSize.XL,
] as const;

const products = [
    {
        sku: 'VLQ-HOD-001',
        name: 'Oversized Hoodie',
        slug: 'oversized-hoodie',
        description:
            'Premium oversized hoodie made from heavyweight cotton. Designed for everyday wear with a relaxed fit and minimal branding.',
        price: 299.99,
        category: ProductCategory.HOODIE,
        mainImage: 'products/oversized-hoodie/main.jpg',
    },
    {
        sku: 'VLQ-HOD-002',
        name: 'Essential Hoodie',
        slug: 'essential-hoodie',
        description:
            'Clean everyday hoodie with a timeless silhouette and premium fabric.',
        price: 279.99,
        category: ProductCategory.HOODIE,
        mainImage: 'products/essential-hoodie/main.jpg',
    },
    {
        sku: 'VLQ-HOD-003',
        name: 'Heavyweight Hoodie',
        slug: 'heavyweight-hoodie',
        description:
            'Heavyweight cotton hoodie built for comfort, durability and everyday wear.',
        price: 329.99,
        category: ProductCategory.HOODIE,
        mainImage: 'products/heavyweight-hoodie/main.jpg',
    },
    {
        sku: 'VLQ-TSH-001',
        name: 'Core T-Shirt',
        slug: 'core-tshirt',
        description:
            'Minimal premium t-shirt designed for everyday use.',
        price: 119.99,
        category: ProductCategory.TSHIRT,
        mainImage: 'products/core-tshirt/main.jpg',
    },
    {
        sku: 'VLQ-TSH-002',
        name: 'Boxy Fit T-Shirt',
        slug: 'boxy-fit-tshirt',
        description:
            'Relaxed boxy fit t-shirt with heavyweight cotton construction.',
        price: 129.99,
        category: ProductCategory.TSHIRT,
        mainImage: 'products/boxy-fit-tshirt/main.jpg',
    },
    {
        sku: 'VLQ-TSH-003',
        name: 'Signature T-Shirt',
        slug: 'signature-tshirt',
        description:
            'Premium t-shirt featuring subtle VELQOR branding.',
        price: 139.99,
        category: ProductCategory.TSHIRT,
        mainImage: 'products/signature-tshirt/main.jpg',
    },
    {
        sku: 'VLQ-LNG-001',
        name: 'Shadow Longsleeve',
        slug: 'shadow-longsleeve',
        description:
            'Long sleeve shirt with a clean silhouette and premium feel.',
        price: 169.99,
        category: ProductCategory.LONGSLEEVE,
        mainImage: 'products/shadow-longsleeve/main.jpg',
    },
    {
        sku: 'VLQ-CAP-001',
        name: 'Logo Cap',
        slug: 'logo-cap',
        description:
            'Classic cap featuring embroidered VELQOR branding.',
        price: 89.99,
        category: ProductCategory.CAP,
        mainImage: 'products/logo-cap/main.jpg',
    },
];


async function main(): Promise<void> {
    console.log('Seeding database...');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error('Admin_EMAIL or ADMIN_PASSWORD is missing');
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    for (const product of products) {
        const savedProduct = await prisma.product.upsert({
            where: {
                slug: product.slug,
            },
            update: product,
            create: product,
        });

        console.log(`Seeded product: ${savedProduct.name}`);

        for (const color of colors) {
            for (const size of sizes) {
                await prisma.productVariant.upsert({
                    where: {
                        productId_color_size: {
                            productId: savedProduct.id,
                            color,
                            size,
                        },
                    },
                    update: {
                        stock: 10,
                    },
                    create: {
                        productId: savedProduct.id,
                        color,
                        size,
                        stock: 10,
                    },
                });
            }
        }
    }

    for (const product of products) {
        const existingProduct = await prisma.product.findUnique({
            where: {
                slug: product.slug,
            },
        });

        if (!existingProduct) {
            throw new Error(`Product not found: ${product.slug}`);
        }

        for (const [index, imageType] of imageTypes.entries()) {
            await prisma.productImage.upsert({
                where: {
                    productId_order: {
                        productId: existingProduct.id,
                        order: index + 1,
                    },
                },
                update: {
                    url: `products/${product.slug}/${imageType}.jpg`,
                    alt: `${product.name} ${imageType}`,
                },
                create: {
                    productId: existingProduct.id,
                    url: `products/${product.slug}/${imageType}.jpg`,
                    alt: `${product.name} ${imageType}`,
                    order: index + 1,
                },
            });
        }
    }
    await prisma.adminUser.upsert({
        where: {
            email: adminEmail,
        },
        update: {
            password: hashedPassword,
        },
        create: {
            email: adminEmail,
            password: hashedPassword,
        },
    });
    console.log(`Seeded admin: ${adminEmail}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });