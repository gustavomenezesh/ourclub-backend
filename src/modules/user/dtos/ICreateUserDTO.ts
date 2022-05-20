interface ICreateUserDTO {
  profileId?: number;
  name: string,
  lastName: string;
  email: string,
  phone: string,
  gender: string;
  password: string,
}

export default ICreateUserDTO;
