import { dbClient } from "./prismaClient";

(async () => {
  //   const dta = await dbClient.project.createMany({
  //     data: [
  //       {
  //         title: "e-chukti",
  //         description: "My personal portfolio website.",
  //         imageUrl: "http://picsum.com/portfolio.png",
  //         featured: true,
  //         status: "DRAFT",
  //       },
  //     ],
  //   });

  // const dta = await dbClient.skill.createMany({
  //   data: [
  //     {
  //       title: "html",

  //       category:"frontend",

  //       level: 80,

  //     },
  //   ],
  // });
  const dta = await dbClient.personalInfo.create({
    data:{
      
    }
  });
  console.log(dta);
})();
