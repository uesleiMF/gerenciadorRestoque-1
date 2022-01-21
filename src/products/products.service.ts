import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private db: PrismaService) {}

  async create(data: CreateProductDto) {
    const productExists = await this.db.product.findUnique({
      where: {
        name: data.name,
      },
    });

    if(productExists){
      throw new ConflictException('Este produto já existe, tente cadastrar um novo produto!')
    }

    const product = await this.db.product.create({
      data: {
        ...data,
      },
    });

    return product
  }

  async findAll() {
    const products = await this.db.product.findMany();
    return products
  }

  async findOne(id: string) {
    const product = await this.db.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product){
      throw new NotFoundException('Produto não encontrado! Verifique os dados inseridos ou tente outro produto!')
    }

    return product 
  }

  async update(id: string, data: UpdateProductDto) {
    const productExists = await this.db.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!productExists) {
      throw new NotFoundException('Produto não encontrado! Verifique os dados inseridos ou tente outro produto!')
    }

    const product = await this.db.product.update({
      where: {
        id: id,
      },
      data: data,
    });

    return {data: product, message: 'Produto atualizado com sucesso!'}
  }

  async remove(id: string) {
    const product = await this.db.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado! Verifique os dados inseridos ou tente outro produto!')
    }

    await this.db.product.delete({
      where: {
        id: id,
      },
    });

    return {message: 'Product Sucessfully deleted!'}
  }

  async findPerNameOrId(name: string, id: string){
      const product = await this.db.product.findFirst({
        where: {
          id,
          OR: {
            name,
          },
        },
      });

      return product;
  }

}
