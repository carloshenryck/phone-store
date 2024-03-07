module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      "phone_attributes",
      [
        {
          price: 2069,
          color: "Rose",
          img: "https://i.ibb.co/5W7QgfG/image.png",
          phone_id: 1,
        },
        {
          price: 2220,
          color: "Preto",
          img: "https://i.ibb.co/5W7QgfG/image.png",
          phone_id: 1,
        },
        {
          price: 4094,
          color: "Rose",
          img: "https://i.ibb.co/C6cg0qz/image.png",
          phone_id: 2,
        },
        {
          price: 3000,
          color: "Rose",
          img: "https://i.ibb.co/9VvpfWB/image.png",
          phone_id: 3,
        },
        {
          price: 2500,
          color: "Rose",
          img: "https://i.ibb.co/SxZQ9CD/image.png",
          phone_id: 4,
        },
        {
          price: 2650,
          color: "Preto",
          img: "https://i.ibb.co/SxZQ9CD/image.png",
          phone_id: 4,
        },
        {
          price: 4500,
          color: "Rose",
          img: "https://i.ibb.co/NTnNpCJ/image.png",
          phone_id: 5,
        },
        {
          price: 8900,
          color: "Rose",
          img: "https://i.ibb.co/5W7QgfG/image.png",
          phone_id: 6,
        },
        {
          price: 3455,
          color: "Rose",
          img: "https://i.ibb.co/C6cg0qz/image.png",
          phone_id: 7,
        },
        {
          price: 1236,
          color: "Rose",
          img: "https://i.ibb.co/9VvpfWB/image.png",
          phone_id: 8,
        },
      ],
      {}
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("phone_attributes");
  },
};
