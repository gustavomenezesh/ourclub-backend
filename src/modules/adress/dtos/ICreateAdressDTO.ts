interface ICreateAdressDTO {
  userId: number;
  state: string;
  cep: string,
  city: string;
  street: string,
  number: string,
  district: string;
  complement?: string | null,
  main?: boolean,
}

export default ICreateAdressDTO;
