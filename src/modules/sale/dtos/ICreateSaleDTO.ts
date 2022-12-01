interface ICreateSaleDTO {
  userId: number;
  adressId: number;
  description: string;
  code: string;
  total: number;
  paymentType: string;
}

export default ICreateSaleDTO;
