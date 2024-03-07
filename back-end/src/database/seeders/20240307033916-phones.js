"use strict";

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      "phone",
      [
        {
          name: "Samsung Galaxy S22+ 128 GB",
          brand: "Samsung",
          model: "Galaxy S22+",
          user_id: 1,
        },
        {
          name: "iPhone 13 PRO 256 GB",
          brand: "Apple",
          model: "iPhone 13",
          user_id: 1,
        },
        {
          name: "Iphone 14 Pro Max 512GB",
          brand: "Apple",
          model: "iPhone 14",
          user_id: 1,
        },
        {
          name: "Motorola Moto G62 128 GB",
          brand: "Motorola",
          model: "Moto G62",
          user_id: 1,
        },
        {
          name: "Samsung Galaxy S20 128GB Cloud Pink 4G",
          brand: "Samsung",
          model: "Galaxy S20",
          user_id: 1,
        },
        {
          name: "Samsung Galaxy S22+ 128 GB",
          brand: "Samsung",
          model: "Galaxy S22+",
          user_id: 2,
        },
        {
          name: "Motorola Moto G62 128 GB",
          brand: "Motorola",
          model: "Moto G62",
          user_id: 2,
        },
        {
          name: "Samsung Galaxy S20 128GB Cloud Pink 4G",
          brand: "Samsung",
          model: "Galaxy S20",
          user_id: 2,
        },
      ],
      {}
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("phone");
  },
};
