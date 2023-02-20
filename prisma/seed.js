const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getPosts().map((post) => {
      return db.Post.create({ data: post });
    })
  );
}

seed();

function getPosts() {
  return [
    { title: "Post1", body: "Post 1 content" },
    { title: "Post2", body: "Post 2 content" },
    { title: "Post3", body: "Post 3 content" },
    { title: "Post4", body: "Post 4 content" },
    { title: "Post5", body: "Post 5 content" },
    { title: "Post6", body: "Post 6 content" },
    { title: "Post7", body: "Post 7 content" },
    { title: "Post8", body: "Post 8 content" },
    { title: "Post9", body: "Post 9 content" },
    { title: "Post10", body: "Post 10 content" },
  ];
}
