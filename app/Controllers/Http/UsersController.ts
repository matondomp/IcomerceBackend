
import user from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import crypto from 'crypto'
export default class UsersController {

    
    public async store({request,response }: HttpContextContract) {

      // const userIds=crypto.randomBytes(4).toString('hex')
        const username = request.input('username')
        const password = request.input('password')

        const dbUser=await user.create({
           username:username,
           password:password,
            
        })
        return dbUser
    
    }
     
    public async index({response}:HttpContextContract){

        const list=await user.all()
        
         return response.json({list:list})
    }

  public async login({request,response,auth}:HttpContextContract){
      
      const username = request.input('username')
      const password = request.input('password')

      await auth.login(username)
     return response.json("correto")
  }

}
