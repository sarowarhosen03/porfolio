'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function ProjectDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="mx-auto max-w-md">
          {/* Error Icon */}
          <div className="text-destructive/60 mb-6 text-6xl">⚠️</div>

          {/* Error Title */}
          <h2 className="text-foreground mb-3 text-2xl font-semibold">Failed to Load Project</h2>

          {/* Error Message */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We couldn't load the project details at the moment. This might be due to a network issue
            or server problem.
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
              href="/project"
              className="border-border text-foreground hover:bg-accent inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 transition-colors"
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
