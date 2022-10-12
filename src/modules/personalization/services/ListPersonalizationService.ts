import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import Personalization from '../infra/typeorm/entities/Personalization';
import IPersonalizationRepository from '../repositories/IPersonalizationRepository';

@injectable()
class ListPersonalizationService {
  @inject(Types.PersonalizationRepository) private personalizationRepository!: IPersonalizationRepository;

  public async execute(): Promise<Personalization[]> {
    const [personalizations] = await this.personalizationRepository.list({ enabled: true });
    return personalizations;
  }
}

export default ListPersonalizationService;
