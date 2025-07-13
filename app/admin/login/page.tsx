"use client";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/svgs/google";
import { signIn } from "next-auth/react";

export default function page() {

    async function handleLogin() {
        await signIn("google", {
            redirectTo: "/dashboard",
        })

    }
    return (

        <div className="flex h-screen items-center justify-center">
            <Button onClick={handleLogin} variant="outline" size="sm" className="hover:shadow-glow transition-smooth">
                <GoogleIcon /> Sign in with Google
            </Button>
        </div>
    );
}