export class CreateProductDto {
    name: string;
    originalPrice: number;
    discountPercent: number; 
    priceWithDiscount: number;
    avaliable: boolean;
}
