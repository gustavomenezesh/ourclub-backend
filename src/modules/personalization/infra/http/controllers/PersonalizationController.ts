import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';
import CreatePersonalizationService from '@modules/personalization/services/CreatePersonalizationService';
import DeletePersonalizationService from '@modules/personalization/services/DeletePersonalizationService';
import ListPersonalizationService from '@modules/personalization/services/ListPersonalizationService';
import UpdatePersonalizationService from '@modules/personalization/services/UpdatePersonalizationService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreatePersonalizationValidator from '../validators/CreatePersonalizationValidator';
import UpdatePersonalizationValidator from '../validators/UpdatePersonalizationValidator';

class PersonalizationController {
    public async list(req: Request, res: Response): Promise<Response> {
        const createPersonalization = AppContainer.resolve<ListPersonalizationService>(ListPersonalizationService);
        const personalizations = await createPersonalization.execute();

        return res.status(200).json(instanceToPlain(personalizations));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const data = await CreatePersonalizationValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const createPersonalization = AppContainer.resolve<CreatePersonalizationService>(CreatePersonalizationService);
        const personalization = await createPersonalization.execute({ data });

        return res.status(StatusCodes.CREATED).json({ id: personalization.id });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const data = await UpdatePersonalizationValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const personalizationId = +req.params.personalizationId;

        const updatePersonalization = AppContainer.resolve<UpdatePersonalizationService>(UpdatePersonalizationService);
        await updatePersonalization.execute({ personalizationId, data });

        return res.status(StatusCodes.NO_CONTENT).json({});
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const personalizationId = +req.params.personalizationId;

        const deletePersonalization = AppContainer.resolve<DeletePersonalizationService>(DeletePersonalizationService);
        await deletePersonalization.execute({ personalizationId });

        return res.status(StatusCodes.NO_CONTENT).json({});
    }
}

export default PersonalizationController;
