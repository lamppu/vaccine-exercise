exports.up = async (knex) => await knex.schema
  .dropTableIfExists('Vaccination')
  .dropTableIfExists('Order')
  .dropTableIfExists('Vaccine')
  .createTable('Vaccine', (table) => {
    table.increments('id').primary();
    table.string('producer');
    table.integer('injections');
  })
  .createTable('Order', (table) => {
    table.uuid('id').primary();
    table.integer('orderNumber');
    table.string('responsiblePerson');
    table.string('healthCareDistrict');
    table.integer('vaccine').unsigned();
    table.specificType('arrived', 'DATETIME(6)');
    table.foreign('vaccine').references('Vaccine.id');
    table.index('arrived', 'idx_arrived');
  })
  .createTable('Vaccination', (table) => {
    table.uuid('vaccinationId').primary();
    table.uuid('sourceBottle');
    table.string('gender');
    table.specificType('vaccinationDate', 'DATETIME(6)');
    table.foreign('sourceBottle').references('Order.id');
    table.index('vaccinationDate', 'idx_vaccinationDate');
  });

exports.down = async (knex) => await knex.schema
.dropTableIfExists('Vaccination')
.dropTableIfExists('Order')
.dropTableIfExists('Vaccine');
