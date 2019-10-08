
exports.up = function(knex) {
  return knex.schema.createTable("notes", (t) => {
    t.bigIncrements("id");
    t.string("content");
    t.timestamp("created_at").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};