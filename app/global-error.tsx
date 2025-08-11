'use client'

import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-background">
                    <div className="max-w-md mx-auto">
                        {/* Error Icon */}
                        <div className="text-6xl mb-6 text-destructive/60">⚠️</div>

                        {/* Error Title */}
                        <h2 className="text-2xl font-semibold mb-3 text-foreground">
                            Something went wrong!
                        </h2>

                        {/* Error Message */}
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            An unexpected error occurred. Please try again or contact support if the problem persists.
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

                        {/* Error Details (only in development) */}
                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-8 text-left">
                                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                                    Error Details
                                </summary>
                                <pre className="mt-2 p-4 bg-muted rounded-md text-xs overflow-auto">
                                    {error.message}
                                    {error.stack && `\n\n${error.stack}`}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            </body>
        </html>
    )
}
