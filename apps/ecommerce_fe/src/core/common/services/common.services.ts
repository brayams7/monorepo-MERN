import { api } from "@/core/api/api.index"


type Response = {
  message:string
}

export const greettingService = async () : Promise<string | null> => {

  try {
    const response = await api.get<Response>('/auth/greet-you')
    const { message } = response.data
    return message
  } catch (error) {
    console.log(error)
    return null
  }
}
