interface ICreateSaleProductDTO {
  saleId: number;
  productId: number;
  sizeId: number;
  personalizationId?: number;
  quantity: number;
}

export default ICreateSaleProductDTO;
