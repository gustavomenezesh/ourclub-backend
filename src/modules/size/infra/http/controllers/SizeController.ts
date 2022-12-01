import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';
import CreateSizeService from '@modules/size/services/CreateSizeService';
import DeleteSizeService from '@modules/size/services/DeleteSizeService';
import ListSizeService from '@modules/size/services/ListSizeService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreateSizeValidator from '../validators/CreateSizeValidator';

class SizeController {
    public async list(req: Request, res: Response): Promise<Response> {
        const createSize = AppContainer.resolve<ListSizeService>(ListSizeService);
        const sizes = await createSize.execute();

        return res.status(200).json(instanceToPlain(sizes));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const data = await CreateSizeValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const createSize = AppContainer.resolve<CreateSizeService>(CreateSizeService);
        const size = await createSize.execute({ data });

        return res.status(StatusCodes.CREATED).json({ id: size.id });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const sizeId = +req.params.sizeId;

        const deleteSize = AppContainer.resolve<DeleteSizeService>(DeleteSizeService);
        await deleteSize.execute({ sizeId });

        return res.status(StatusCodes.NO_CONTENT).json({});
    }
}

export default SizeController;
