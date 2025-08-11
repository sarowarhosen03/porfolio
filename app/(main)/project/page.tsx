import Projects from "@/components/Projects";
import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";

export default async function projectPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const currentPage = parseInt(page || "1");
    const itemsPerPage = 8;
    const skip = (currentPage - 1) * itemsPerPage;

    const [data, error] = await resolvePromise(
        Promise.all([
            dbClient.project.findMany({
                where: {
                    status: "PUBLISHED"
                },
                skip,
                take: itemsPerPage,
                orderBy: [
                    {
                        featured: "desc"
                    },
                    {
                        updatedAt: "desc"
                    }
                ]
            }),
            dbClient.project.count({
                where: {
                    status: "PUBLISHED"
                }
            })
        ])
    );

    if (error || !data) {
        throw new Error("Failed to load projects");
    }

    const [projects, totalProjects] = data;
    const totalPages = Math.ceil(totalProjects / itemsPerPage);

    return (
        <section id="projects">
            <Projects
                projects={projects}
                currentPage={currentPage}
                totalPages={totalPages}
                totalProjects={totalProjects}
                itemsPerPage={itemsPerPage}
            />
        </section>
    );
}