import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AdimsSchema extends BaseSchema {
  protected tableName = 'adims'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('adimname')
      table.string('password', 180).notNullable()
      table.string('avatar')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
