interface IUpdateAdressDTO {
  userId?: number;
  state?: string;
  cep?: string,
  city?: string;
  street?: string,
  number?: string,
  district?: string;
  complement?: string,
  main?: boolean,
  enabled?: boolean;
}

export default IUpdateAdressDTO;
