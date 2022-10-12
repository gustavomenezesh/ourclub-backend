interface IUpdateSaleDTO {
  userId?: number;
  adressId?: number;
  description?: string;
  code?: string;
  total?: number;
  paymentType?: string;
}

export default IUpdateSaleDTO;
