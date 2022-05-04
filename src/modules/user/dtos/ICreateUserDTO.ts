interface ICreateUserDTO {
  profileId: number;
  name: string,
  lastname: string;
  email: string,
  phone: string,
  gender: string;
  password: string,
}

export default ICreateUserDTO;
