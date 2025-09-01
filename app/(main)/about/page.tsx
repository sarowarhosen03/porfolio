import About from "@/components/pages/About";
import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";

export default async function AboutPage() {
  const [data, error] = await resolvePromise(
    Promise.all([
      dbClient.personalInfo.findFirst(),
      dbClient.skill.findMany(),
      dbClient.project.findMany({
        where: {
          status: "PUBLISHED",
        },
      }),
    ])
  );

  if (error) return <div>Error happened</div>;
  if (!data || !data[0]) return <div>No personal info found</div>;
  const [personalInfo, skills, projects] = data;

  return <About data={[personalInfo, skills, projects]} />;
}
