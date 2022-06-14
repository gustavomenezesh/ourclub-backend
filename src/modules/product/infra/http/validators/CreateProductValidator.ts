import * as Z from 'zod';

const schema = Z.object({
  subCategoryId: Z.number().nonnegative(),
  title: Z.string().nonempty().max(64),
  description: Z.string().nonempty().max(1024),
  value: Z.number().nonnegative(),
  gender: Z.enum(['MASCULINO', 'FEMININO', 'OUTROS']),
});

export default schema;
