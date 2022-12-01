import * as Z from 'zod';

const schema = Z.object({
  tracking: Z.string(),
});

export default schema;
