exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("user_type").notNullable().defaultTo("photographer");
    })
    .createTable("house", function (house) {
      house.increments("id").primary();
      house
        .integer("users_id")
        .references("id")
        .inTable("users")
        .notNullable()
        .onDelete("cascade");
      house.string("address").notNullable();
      house.string("city").notNullable();
      house.string("state").notNullable();
      house.string("zip_code").notNullable();
    })
    .createTable("house_photos", function (house_photos) {
      house_photos.increments("id").primary();
      house_photos
        .integer("house_id")
        .references("id")
        .inTable("house")
        .notNullable()
        .onDelete("cascade");
      house_photos
        .integer("users_id")
        .references("id")
        .inTable("users")
        .notNullable()
        .onDelete("cascade");
      house_photos.string("high_res").notNullable();
      house_photos.string("low_res").notNullable();
      house_photos.specificType("photos", "text ARRAY").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
  return knex.schema.dropTable("photos");
  return knex.schema.dropTable("house");
};
