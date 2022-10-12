import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import { inject, injectable } from 'inversify';
import IPersonalizationRepository from '../repositories/IPersonalizationRepository';

interface IRequest {
    personalizationId: number,
}

@injectable()
class DeletePersonalizationService {
    @inject(Types.PersonalizationRepository) private personalizationRepository!: IPersonalizationRepository;

    public async execute({ personalizationId }: IRequest): Promise<void> {
        const personalizationFound = await this.personalizationRepository.find({ id: personalizationId });
        if (!personalizationFound) throw new AppError('Personalization not found', 404);

        await this.personalizationRepository.update(personalizationFound, { enabled: false });
    }
}

export default DeletePersonalizationService;

