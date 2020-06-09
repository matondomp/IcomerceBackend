    import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
    import Category from 'App/Models/Category'
    import crypto from  'crypto'
export default class CategoriesController {

    
    public async index({response}:HttpContextContract){
        
        const listCategoreis=await Category.query()
        return response.json(listCategoreis)
    }

    public async store({ request, response }: HttpContextContract){
       
        const id= crypto.randomBytes(4).toString('hex')
        const category: string = request.input('name')
       const data=await Category.create(
          {
            name: category,
            product_id: id,

          })
          return response.json(data)
    }
}
