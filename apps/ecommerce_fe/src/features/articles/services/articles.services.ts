import { api } from "@/core/api/api.index";
import { IArticle } from "../types/article.types";

export const listArticlesService = async () => {

  try {
    const response = await api.get<IArticle>('/articles')
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}
