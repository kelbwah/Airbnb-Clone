const mongoose = require('mongoose'); 

const userIds = [];

for (let i = 0; i < 16; i++) {
    userIds.push(new mongoose.Types.ObjectId());
}

const dummy_users = [
    {
      _id: userIds[0],
      email: "user0_test@mail.com",
      firstName: "Alice",
      lastName: "Johnson",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[1],
      email: "user1_test@mail.com",
      firstName: "Bob",
      lastName: "Smith",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[2],
      email: "user2_test@mail.com",
      firstName: "Charlie",
      lastName: "Brown",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[3],
      email: "user3_test@mail.com",
      firstName: "David",
      lastName: "Williams",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[4],
      email: "user4_test@mail.com",
      firstName: "Eva",
      lastName: "Miller",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[5],
      email: "user5_test@mail.com",
      firstName: "Frank",
      lastName: "Davis",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[6],
      email: "user6_test@mail.com",
      firstName: "Grace",
      lastName: "Thomas",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[7],
      email: "user7_test@mail.com",
      firstName: "Henry",
      lastName: "Clark",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[8],
      email: "user8_test@mail.com",
      firstName: "Ivy",
      lastName: "Wilson",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[9],
      email: "user9_test@mail.com",
      firstName: "Jack",
      lastName: "Moore",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[10],
      email: "user10_test@mail.com",
      firstName: "Katie",
      lastName: "Lee",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[11],
      email: "user11_test@mail.com",
      firstName: "Leo",
      lastName: "Baker",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[12],
      email: "user12_test@mail.com",
      firstName: "Mia",
      lastName: "Ward",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[13],
      email: "user13_test@mail.com",
      firstName: "Nathan",
      lastName: "Fisher",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[14],
      email: "user14_test@mail.com",
      firstName: "Olivia",
      lastName: "Lopez",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
    {
      _id: userIds[15],
      email: "user15_test@mail.com",
      firstName: "Peter",
      lastName: "Barnes",
      password: "test",
      picturePath: "https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp",
    },
  ];

module.exports = dummy_users;