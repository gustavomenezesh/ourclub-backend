import Profile from '@modules/user/infra/typeorm/entities/Profile';

import IUpdateProfileDTO from '@modules/user/dtos/IUpdateProfileDTO';
import ICreateProfileDTO from '@modules/user/dtos/ICreateProfileDTO';

interface IProfileRepository {
  create(data: ICreateProfileDTO): Promise<Profile>;
  find(where: object | object[], relations?: string[]): Promise<Profile | undefined>;
  list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Profile[], number]>;
  update(profile: Profile, data: IUpdateProfileDTO): Promise<Profile>;
  delete(id: number): Promise<boolean>;
}

export default IProfileRepository;
