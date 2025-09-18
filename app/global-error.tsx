'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

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
        <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <div className="mx-auto max-w-md">
            {/* Error Icon */}
            <div className="text-destructive/60 mb-6 text-6xl">⚠️</div>

            {/* Error Title */}
            <h2 className="text-foreground mb-3 text-2xl font-semibold">Something went wrong!</h2>

            {/* Error Message */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              An unexpected error occurred. Please try again or contact support if the problem
              persists.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={reset}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>

              <Link
                href="/"
                className="border-border text-foreground hover:bg-accent inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 transition-colors"
              >
                <AlertCircle className="h-4 w-4" />
                Go Home
              </Link>
            </div>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left">
                <summary className="text-muted-foreground hover:text-foreground cursor-pointer text-sm">
                  Error Details
                </summary>
                <pre className="bg-muted mt-2 overflow-auto rounded-md p-4 text-xs">
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
