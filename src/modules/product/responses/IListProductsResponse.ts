interface IListProductsResponse {
  id?: number;
  title?: string;
  value?: number | null;
  description?: string;
  gender?: string;
  images?: {
    url: string;
  }[];
}

export default IListProductsResponse;
