
exports.up = async (knex) => await knex.schema
  .createTable('Order', (table) => {
    table.uuid('id').primary();
    table.integer('orderNumber');
    table.string('responsiblePerson');
    table.string('healthCareDistrict');
    table.string('vaccine');
    table.integer('injections');
    table.timestamp('arrived');
  })
  .createTable('Vaccination', (table) => {
    table.uuid('vaccinationId').primary();
    table.uuid('sourceBottle');
    table.string('gender');
    table.timestamp('vaccinationDate');
    table.foreign('sourceBottle').references('Order.id');
  });

exports.down = async (knex) => await knex.schema
  .dropTableIfExists('Vaccination')
  .dropTableIfExists('Order');
