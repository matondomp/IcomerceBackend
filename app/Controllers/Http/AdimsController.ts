
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import crypto from 'crypto'
import adim from 'App/Models/Adim'


export default class adimsController {

    public async login({ request,auth }: HttpContextContract) {
        const adimname = request.input('adimname')
        const password = request.input('password')
        const id= await auth.login(adimname, password)
        return id
    }

    public async store({ request, response }: HttpContextContract) {

      const fileName=crypto.randomBytes(4).toString('hex')
        const adimSchema = schema.create({
            adimname:schema.string(),
            password:schema.string(),
            avatar: schema.file({
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg'],
            }),
           
        })

        const data = await request.validate({
            schema: adimSchema
        })
            
        try {
            var field = `${fileName}-${new Date().getTime()}.${data.avatar.extname}`
            const adims= await adim.create({
                            adimname:data.adimname,
                            password:data.password,
                            avatar:field,
                    })

                if(adims){
                    data.avatar.move(Application.tmpPath('upload'), {
                name: field, 
               
            } ) 
            return response.json({ adim_id: adims.id })
                }        
            
           

        } catch (errs) {
            const messages = {
                'avatar.file.extname': 'You can only upload images', 'avatar.file.size': 'Image size must be under 1gb',
            }
            const err = await request.validate({
                schema: adimSchema,
                messages,
            })
            response.json({ erros: err })
        }

    }

    public async index({ response }: HttpContextContract) {
        const data = await adim.all()
         response.json({ adim: data })
    }

}
