import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';
import CreatePromotionService from '@modules/promotion/services/CreatePromotionService';
import DeletePromotionService from '@modules/promotion/services/DeletePromotionService';
import ListPromotionService from '@modules/promotion/services/ListPromotionService';
import UpdatePromotionService from '@modules/promotion/services/UpdatePromotionService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreatePromotionValidator from '../validators/CreatePromotionValidator';
import UpdatePromotionValidator from '../validators/UpdatePromotionValidator';

class PromotionController {
    public async list(req: Request, res: Response): Promise<Response> {
        const createPromotion = AppContainer.resolve<ListPromotionService>(ListPromotionService);
        const promotions = await createPromotion.execute();

        return res.status(200).json(instanceToPlain(promotions));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const data = await CreatePromotionValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const createPromotion = AppContainer.resolve<CreatePromotionService>(CreatePromotionService);
        const promotion = await createPromotion.execute({ data });

        return res.status(StatusCodes.CREATED).json({ id: promotion.id });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const data = await UpdatePromotionValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const promotionId = +req.params.promotionId;

        const updatePromotion = AppContainer.resolve<UpdatePromotionService>(UpdatePromotionService);
        await updatePromotion.execute({ promotionId, data });

        return res.status(StatusCodes.NO_CONTENT).json({});
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const promotionId = +req.params.promotionId;

        const deletePromotion = AppContainer.resolve<DeletePromotionService>(DeletePromotionService);
        await deletePromotion.execute({ promotionId });

        return res.status(StatusCodes.NO_CONTENT).json({});
    }
}

export default PromotionController;
