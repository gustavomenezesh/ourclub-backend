import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import Schema from '@modules/personalization/infra/http/validators/UpdatePersonalizationValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import IPersonalizationRepository from '../repositories/IPersonalizationRepository';

interface IRequest {
  personalizationId: number,
  data: Z.infer<typeof Schema>,
}

@injectable()
class UpdatePersonalizationService {
  @inject(Types.PersonalizationRepository)
  private personalizationRepository!: IPersonalizationRepository;

  public async execute({ personalizationId, data }: IRequest): Promise<void> {
    const personalizationFound = await this.personalizationRepository.find({
      id: personalizationId,
    });
    if (!personalizationFound) throw new AppError('Personalization not found', 404);

    await this.personalizationRepository.update(personalizationFound, data);
  }
}

export default UpdatePersonalizationService;
