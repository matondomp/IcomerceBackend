import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  @column()
  public name: string
  @column()
  public value: string
  @column()
  public description_smoll: string
  @column()
  public description_long: string
  @column()
  public file: string
 

  @hasMany(() => Category)
  public category: HasMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
