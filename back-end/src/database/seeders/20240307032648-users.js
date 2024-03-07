"use strict";
const crypto = require("crypto");
const hash = (password) =>
  crypto.createHash("md5").update(password).digest("hex");

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      "user",
      [
        {
          name: "Carlos",
          email: "carlos@gmail.com",
          password: hash("teste123"),
        },
        {
          name: "Maria",
          email: "maria@gmail.com",
          password: hash("teste123"),
        },
      ],
      {}
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("user");
  },
};
