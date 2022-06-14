import * as Z from 'zod';

const schema = Z.object({
  subCategoryId: Z.number().nonnegative().optional(),
  title: Z.string().nonempty().max(64).optional(),
});

export default schema;
