interface IStorageProvider{
  save(file: string, output?: string): Promise<string>;
  retrieve(file: string): Promise<string>;
  delete(file: string): Promise<void>;
}

export default IStorageProvider;
