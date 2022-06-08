import { Router } from 'express';
import userRouter from '@modules/user/infra/http/routes/UserRouter';
import categoryRouter from '@modules/category/infra/http/routes/CategoryRouter';
import subCategoryRouter from '@modules/subcategory/infra/http/routes/SubCategoryRouter';
import imageRouter from '@modules/image/infra/http/router/ImageRouter';
import sizeRouter from '@modules/size/infra/http/routes/SizeRouter';
import tagRouter from '@modules/tag/infra/http/routes/TagRouter';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/categories', categoryRouter);
routes.use('/sub-categories', subCategoryRouter);
routes.use('/images', imageRouter);
routes.use('/sizes', sizeRouter);
routes.use('/tags', tagRouter);

export default routes;
