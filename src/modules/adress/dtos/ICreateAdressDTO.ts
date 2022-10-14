interface ICreateAdressDTO {
  id?: number;
  userId: number;
  state: string;
  cep: string,
  city: string;
  street: string,
  number: string,
  district: string;
  complement?: string;
  main?: boolean;
}

export default ICreateAdressDTO;
