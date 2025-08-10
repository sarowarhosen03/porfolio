import { Button } from "@/components/ui/button";
import { decodeSlug } from "@/lib/projectSlug";
import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from 'remark';
import html from 'remark-html';

export default async function projectDetailsPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;
    const { title, id } = decodeSlug(projectId);
    console.log(title);

    const [data, error] = await resolvePromise(
        dbClient.project.findFirst({
            where: {
                title: title,
            },
        })
    );
    if (error) {
        return <div>Error happend</div>;
    }
    if (!data) {
        notFound();
    }


    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(data.description);
    const contentHtml = processedContent.toString();
    console.log(contentHtml);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className=" bg-muted/30 rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-96 w-full">
                    <Image
                        alt={data.title}
                        layout="fill"
                        objectFit="cover"
                        src={data.gallery[0]}
                    />
                </div>
                <div className="p-6 md:p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{data.title}</h1>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {data.technologies.map((tag) => (
                            <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                                {tag}
                            </span>
                        ))

                        }
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />

                    <div className="mt-8 flex flex-wrap gap-4">
                        {data.liveUrl && (


                            <Link href={data.liveUrl} target="_blank">

                                <Button
                                    variant="secondary" size="sm" className="shadow-lg">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Live Demo
                                </Button>
                            </Link>
                        )}
                        {data.sourceCodeUrl && (

                            <Link href={data.sourceCodeUrl} target="_blank">
                                <Button variant="secondary" size="sm" className="shadow-lg">
                                    <Github className="h-4 w-4 mr-2" />
                                    Code
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {data.gallery.length > 1 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Image Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {data.gallery.map((image, index) => (
                            <div key={index} className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    alt={`${data.title} - image ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    src={image}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
