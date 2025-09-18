'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section id="projects">
      <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-md">
          {/* Error Icon */}
          <div className="text-destructive/60 mb-6 text-6xl">⚠️</div>

          {/* Error Title */}
          <h2 className="text-foreground mb-3 text-2xl font-semibold">Failed to Load Projects</h2>

          {/* Error Message */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We couldn't load the projects at the moment. This might be due to a network issue or
            server problem.
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
        </div>
      </div>
    </section>
  )
}
