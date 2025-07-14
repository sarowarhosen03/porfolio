import Admin from "@/components/pages/Admin";
import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";

export default async function DashboardPage() {
    // const [[totalProject, totalSkill, featuredProject], error] = 
    const [data, error] = await resolvePromise(Promise.all([
        dbClient.project.findMany()
        , dbClient.skill.findMany(),
        dbClient.personalInfo.findFirst(),

    ]))

    if (error || !data) {
        return <div>Error loading dashboard data.</div>;
    }

    const [projects, skills, personalInfo] = data;

    // Optionally, handle the case where personalInfo is null
    if (!personalInfo) {
        return <div>Error: Personal info not found.</div>;
    }

    return (
        <Admin data={{ projects, skills, personalInfo }} />
    );
}