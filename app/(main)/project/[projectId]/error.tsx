'use client'

import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailsError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="max-w-md mx-auto">
                    {/* Error Icon */}
                    <div className="text-6xl mb-6 text-destructive/60">⚠️</div>

                    {/* Error Title */}
                    <h2 className="text-2xl font-semibold mb-3 text-foreground">
                        Failed to Load Project
                    </h2>

                    {/* Error Message */}
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        We couldn't load the project details at the moment. This might be due to a network issue or server problem.
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
                            href="/project"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground rounded-md hover:bg-accent transition-colors"
                        >
                            <AlertCircle className="h-4 w-4" />
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
