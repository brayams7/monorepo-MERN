export interface IResponseArticles {
  message: string;
  list:    IArticle[];
}

export interface IArticle {
  _id?:       string;
  color:     string;
  modelo:    number;
  price:     number;
  marca:     string;
  gas:       string;
  createdAt?: Date;
  updatedAt?: Date;
}
