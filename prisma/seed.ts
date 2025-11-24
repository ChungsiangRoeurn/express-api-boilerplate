import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.products.createMany({
    data: [
      {
        name: "Coffee",
        description: "Fresh black coffee",
        price: 100,
        tags: "Coffee,Drink",
      },
      {
        name: "Tea",
        description: "Hot green tea",
        price: 80,
        tags: "Tea,Drink",
      },
      {
        name: "Latte",
        description: "Milk latte",
        price: 150,
        tags: "Coffee,Milk,Drink",
      },
      {
        name: "Cappuccino",
        description: "Espresso with steamed milk foam",
        price: 130,
        tags: "Coffee,Drink",
      },
      {
        name: "Mocha",
        description: "Chocolate flavored coffee",
        price: 160,
        tags: "Coffee,Chocolate,Drink",
      },
      {
        name: "Green Tea Latte",
        description: "Matcha with milk",
        price: 120,
        tags: "Tea,Milk,Drink",
      },
      {
        name: "Black Tea",
        description: "Strong hot black tea",
        price: 90,
        tags: "Tea,Drink",
      },
      {
        name: "Espresso",
        description: "Strong concentrated coffee shot",
        price: 110,
        tags: "Coffee,Drink",
      },
      {
        name: "Herbal Tea",
        description: "Chamomile and mint blend",
        price: 95,
        tags: "Tea,Herbal,Drink",
      },
      {
        name: "Iced Coffee",
        description: "Chilled coffee with ice",
        price: 140,
        tags: "Coffee,Cold,Drink",
      },
      {
        name: "Iced Latte",
        description: "Cold milk coffee",
        price: 150,
        tags: "Coffee,Milk,Cold,Drink",
      },
      {
        name: "Hot Chocolate",
        description: "Sweet chocolate drink",
        price: 120,
        tags: "Chocolate,Drink,Hot",
      },
      {
        name: "Chai Latte",
        description: "Spiced tea with milk",
        price: 130,
        tags: "Tea,Spice,Milk,Drink",
      },
    ],
  });

  console.log("Mock data inserted!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
