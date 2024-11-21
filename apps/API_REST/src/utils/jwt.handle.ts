import {sign, verify, VerifyErrors} from 'jsonwebtoken'
import "dotenv/config"
import { JSON_WEB_TOKEN_ERROR, TOKEN_EXPIRED_ERROR } from './typesErrors'
import { JwtValidClass } from '../Class/JwtValidClass'

const JWT_SECRET = process.env.JWT_SECRET || "Secreto2022"

const generateToken = (id:string)=>{
    const jwt = sign({id},JWT_SECRET,{
        expiresIn:"2h"
    })

    return jwt
}

const verifyToken = (token:string)=>{
    const jwtValidClass = new JwtValidClass(false,"",{id:'', iat: 0, exp: 0})

    verify(token, JWT_SECRET, (error:null | VerifyErrors, decod:any) => {

      if (error) {
        switch (error.name) {
          case TOKEN_EXPIRED_ERROR:
            jwtValidClass.setIsError(true)
            jwtValidClass.setMessage('TOKEN EXPIRADO')
            break
          case JSON_WEB_TOKEN_ERROR:
            jwtValidClass.setIsError(true)
            jwtValidClass.setMessage('JSON WEB TOKEN ERROR')
            break
          default:
            jwtValidClass.setIsError(true)
            jwtValidClass.setMessage('TOKEN INVÁLIDO')
            break 
        }
      }else{
        jwtValidClass.setIsError(false)
        jwtValidClass.setMessage('TOKEN VÁLIDO')
        jwtValidClass.setPayload({
            id:decod.id, iat: decod.iat, exp: decod.exp
        })
      }
        
    })

    return jwtValidClass.getFullData()
}

export {
    generateToken,
    verifyToken
}