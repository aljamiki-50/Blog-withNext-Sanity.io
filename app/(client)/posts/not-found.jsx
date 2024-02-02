import Header from '@/app/components/Header/Header'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div>
      <Header title={"404 - Page Not Found"} />
      <div>
        <Link href="/">
          <a>Return Home</a>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
