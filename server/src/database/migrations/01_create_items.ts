import Knex from 'knex'; //ao referir ao tipo da variavel, possui letra maiuscula

export async function up(knex: Knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

export async function down(knex: Knex) {
    knex.schema.dropTable('items');
}
