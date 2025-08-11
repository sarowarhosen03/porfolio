'use client'

import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ProjectError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <section id="projects">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                <div className="max-w-md mx-auto">
                    {/* Error Icon */}
                    <div className="text-6xl mb-6 text-destructive/60">⚠️</div>

                    {/* Error Title */}
                    <h2 className="text-2xl font-semibold mb-3 text-foreground">
                        Failed to Load Projects
                    </h2>

                    {/* Error Message */}
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        We couldn't load the projects at the moment. This might be due to a network issue or server problem.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={reset}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </button>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground rounded-md hover:bg-accent transition-colors"
                        >
                            <AlertCircle className="h-4 w-4" />
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
