  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import produt from 'App/Models/Product'
import crypto from 'crypto'


export default class ProductsController {

    public async store({ request,response }: HttpContextContract) {
      
  
        const productSchema:any = schema.create({

            name: schema.string(),
            value: schema.string(),
            description_smoll: schema.string(),
            description_long: schema.string(),
            file: schema.file(
                { 
                    size: '2gb', 
                    extnames: ['jpg', 'png', 'jpeg','gif','mp4'],
                 }
                ),
        })

        const data:any = await request.validate({
            schema: productSchema,
        })
        try {

            const fileName = crypto.randomBytes(4).toString('hex')
            
            var field:any = `${fileName}-${new Date().getTime()}.${data.file.extname}`
       
         const id:any = request.headers().authorization
            const datas=await produt.create({
                  name:data.name,
                value:data.value,
                description_smoll:data.description_smoll,
                description_long:data.description_long,
                file:field,
                id:id,
            })
              if(datas){
                await data.file.move(Application.tmpPath('products'), {
                    name: field,
            })

           return response.json({ products_id: datas} )
              
              }
  
        } catch (errs) {
            const messages:any = {
                'file.file.extname': 'You can only upload images', 'file.file.size': 'Image size must be under 1gb',
            }
            const err:any = await request.validate({
                schema: productSchema,
                messages,
            })
            response.json({ erros: err })
        }    
    }

    public async index({request,response}:HttpContextContract){
        const id:any= request.headers().authorization
        const listProducts = await produt.query().where('id',id)
                .preload('category')
        return response.json({product:listProducts})
    }
}
