import { SignIn } from '@clerk/nextjs'
import { Suspense } from 'react'

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <SignIn appearance={{
        elements: {
          footer: {
            display: 'none',
          },
        },
      }}/>
    </div>
  )
}