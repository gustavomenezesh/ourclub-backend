import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';
import CreateImageService from '@modules/image/services/CreateImageService';
import DeleteImageService from '@modules/image/services/DeleteImageService';
import ListImageService from '@modules/image/services/ListImageService';
import UpdateImageService from '@modules/image/services/UpdateImageService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreateImageValidator from '../validators/CreateImageValidator';
import UpdateImageValidator from '../validators/UpdateImageValidator';

class ImageController {
    public async list(req: Request, res: Response): Promise<Response> {
        const createImage = AppContainer.resolve<ListImageService>(ListImageService);
        const images = await createImage.execute();

        return res.status(200).json(instanceToPlain(images));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const data = await CreateImageValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const createImage = AppContainer.resolve<CreateImageService>(CreateImageService);
        const image = await createImage.execute({ data });

        return res.status(StatusCodes.CREATED).json({ id: image.id });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const data = await UpdateImageValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const imageId = +req.params.imageId;

        const updateImage = AppContainer.resolve<UpdateImageService>(UpdateImageService);
        await updateImage.execute({ imageId, data });

        return res.status(StatusCodes.NO_CONTENT).json({});
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const imageId = +req.params.imageId;

        const deleteImage = AppContainer.resolve<DeleteImageService>(DeleteImageService);
        await deleteImage.execute({ imageId });

        return res.status(StatusCodes.NO_CONTENT).json({});
    }
}

export default ImageController;
