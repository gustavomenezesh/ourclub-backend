import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';
import CreateTagService from '@modules/tag/services/CreateTagService';
import DeleteTagService from '@modules/tag/services/DeleteTagService';
import ListTagService from '@modules/tag/services/ListTagService';
import UpdateTagService from '@modules/tag/services/UpdateTagService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreateTagValidator from '../validators/CreateTagValidator';
import UpdateTagValidator from '../validators/UpdateTagValidator';

class TagController {
    public async list(req: Request, res: Response): Promise<Response> {
        const createTag = AppContainer.resolve<ListTagService>(ListTagService);
        const tags = await createTag.execute();

        return res.status(200).json(instanceToPlain(tags));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const data = await CreateTagValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const createTag = AppContainer.resolve<CreateTagService>(CreateTagService);
        const tag = await createTag.execute({ data });

        return res.status(StatusCodes.CREATED).json({ id: tag.id });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const data = await UpdateTagValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const tagId = +req.params.tagId;

        const updateTag = AppContainer.resolve<UpdateTagService>(UpdateTagService);
        await updateTag.execute({ tagId, data });

        return res.status(StatusCodes.NO_CONTENT).json({});
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const tagId = +req.params.tagId;

        const deleteTag = AppContainer.resolve<DeleteTagService>(DeleteTagService);
        await deleteTag.execute({ tagId });

        return res.status(StatusCodes.NO_CONTENT).json({});
    }
}

export default TagController;
