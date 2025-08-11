import Projects from "@/components/Projects";
import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";

export default async function projectPage() {
    const [data, error] = await resolvePromise(
        dbClient.project.findMany({
            where: {
                status: "PUBLISHED"

            }

        })
    )
    if (error || !data) return <div>Error happened</div>;

    return (
        <section id="projects">
            <Projects projects={data} />
        </section>
    );
}