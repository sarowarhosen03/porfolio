import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";
import Profile from "./_components/Profile";

export default async function profilePage() {
    const [data, error] = await resolvePromise(dbClient.personalInfo.findFirst())

    if (error || !data) {
        return <div>Error loading dashboard data.</div>;
    }



    return (
        <Profile info={data} />
    );
}