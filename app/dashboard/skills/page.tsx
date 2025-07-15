import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";
import SkillPage from "./_components/Skill";

export default async function skillsPage() {
    const [data, error] = await resolvePromise(Promise.all([
        dbClient.skill.findMany({
            orderBy: {
                updatedAt: "desc"
            }
        }),

    ]))

    if (error || !data) {
        return <div>Error loading dashboard data.</div>;
    }

    const [skills] = data;

    return (
        <SkillPage skills={skills} />
    );
}