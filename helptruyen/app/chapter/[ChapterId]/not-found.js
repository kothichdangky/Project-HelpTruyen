"use-client"

import Link from "next/link"

function NotFound() {
  return (
    <main className='text-center space-y-6 mt-50 top-10'>
      <h1 className='text-3xl font-semibold'>
        Not be found this manga  :(
      </h1>
      <Link
        href='/'
        className='inline-block bg-blue-500 text-white-50 px-6 py-3 text-lg'
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
