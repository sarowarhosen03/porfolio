import { Eye, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function LoginButton() {
    const { data, status } = useSession();
    return (
        process.env.NODE_ENV === "development" && (
            <>
                {status === "authenticated" && (
                    <Link href={"/dashboard"}>
                        <button className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left">
                            <Eye />
                        </button>
                    </Link>
                )}
                {status !== "authenticated" && (
                    <Link href={"/admin/login"}>
                        <button className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left">
                            <LogIn />
                        </button>
                    </Link>
                )}
            </>
        )
    );
}
