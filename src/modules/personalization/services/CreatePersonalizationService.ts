import Types from '@common/container/types';
import Schema from '@modules/personalization/infra/http/validators/CreatePersonalizationValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import Personalization from '../infra/typeorm/entities/Personalization';
import IPersonalizationRepository from '../repositories/IPersonalizationRepository';

interface IRequest {
    data: Z.infer<typeof Schema>,
}

@injectable()
class CreatePersonalizationService {
    @inject(Types.PersonalizationRepository) private personalizationRepository!: IPersonalizationRepository;

    public async execute({ data }: IRequest): Promise<Personalization> {
        const personalization = await this.personalizationRepository.create(data);
        return personalization;
    }
}

export default CreatePersonalizationService;
