// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'express_lab_note_saver',
    }, 
    migrations: {
      directory: "./db/migrations"
    }
  }
};
