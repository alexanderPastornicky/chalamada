import { SignIn } from '@clerk/nextjs'
import { Suspense } from 'react'

export default function Page() {
  return (
    <div className="flex mt-10 md:mt-0 md:items-center justify-center min-h-[calc(100vh-4rem)] px-4">
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