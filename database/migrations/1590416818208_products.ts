import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('name').notNullable()
      table.string('value').notNullable()
      table.string('description_smoll').notNullable()
      table.string('description_long').notNullable()
      table.string('file')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
