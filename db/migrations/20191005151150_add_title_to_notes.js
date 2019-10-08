
exports.up = function(knex) {
  return knex.schema.table("notes", function(t) {
    t.string("title");
  });
};

exports.down = function(knex) {
  return knex.schema.table("notes", function(t) {
    t.dropColumn('title');
  });
};
