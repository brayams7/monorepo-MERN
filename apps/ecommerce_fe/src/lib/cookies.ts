import cookie from "universal-cookie"

const TOKEN = "token"
// const USERDATA = "userdata"

const cookies = new cookie(null,{
  path: "/",
})


export const setToken = (token: string) => {
  cookies.set(TOKEN, token, { path: "/" })
}

export const getToken = () => {
  return cookies.get(TOKEN)
}

export const removeToken = () => {
  cookies.remove(TOKEN)
}

