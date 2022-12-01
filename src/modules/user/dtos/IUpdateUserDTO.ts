interface IUpdateUserDTO {
  profileId?: number;
  name?: string,
  lastname?: string;
  email?: string,
  phone?: string,
  gender?: string;
  password?: string,
}

export default IUpdateUserDTO;
