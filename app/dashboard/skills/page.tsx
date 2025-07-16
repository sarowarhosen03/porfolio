import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";
import SkillPage from "./_components/Skill";

export default async function skillsPage() {
    const [data, error] = await resolvePromise(dbClient.skill.findMany({
        orderBy: {
            updatedAt: "desc"
        }
    }))

    if (error || !data) {
        return <div>Error loading dashboard data.</div>;
    }


    return (
        <SkillPage skills={data} />
    );
}