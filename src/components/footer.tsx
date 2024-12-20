import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="mt-auto bg-gray-200/50">
      <div className="flex container px-2 mx-auto items-center justify-center py-2">
        <span className="text-xs text-gray-500">
          Made with ❤️ by{' '}
          <Link
            target="_blank"
            className="underline"
            href="https://github.com/Vitor-Franco"
            rel="nofollow"
          >
            Vitor Franco
          </Link>
        </span>
      </div>
    </footer>
  )
}

export { Footer }
