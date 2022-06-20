import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';

import CreateSaleValidator from '@modules/sale/infra/http/validators/CreateSaleValidator';
import CreateSaleService from '@modules/sale/services/CreateSaleService';

import UpdateSaleValidator from '@modules/sale/infra/http/validators/UpdateSaleValidator';
import UpdateSaleService from '@modules/sale/services/UpdateSaleService';

import ListSaleService from '@modules/sale/services/ListSaleService';
import { instanceToPlain } from 'class-transformer';

class SaleController {
  public async create(req:Request, res:Response): Promise<Response> {
    const data = await CreateSaleValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const createSale = AppContainer.resolve<CreateSaleService>(CreateSaleService);
    const sale = await createSale.execute({ data });

    return res.status(StatusCodes.CREATED).json({ id: sale.id });
  }

  public async list(req:Request, res:Response): Promise<Response> {
    const listSale = AppContainer.resolve<ListSaleService>(ListSaleService);
    const sale = await listSale.execute(req.query.userId);

    return res.status(200).json(instanceToPlain(sale));
  }

  public async update(req:Request, res:Response): Promise<Response> {
    const data = await UpdateSaleValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const deliveryId = +req.params.delivery;

    const updateSale = AppContainer.resolve<UpdateSaleService>(UpdateSaleService);
    await updateSale.execute({ deliveryId, data });

    return res.status(204).json();
  }
}

export default SaleController;
