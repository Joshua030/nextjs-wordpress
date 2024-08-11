import Link from "next/link"

const ButtonLink = ({destination, label}) => {
  return (
    <Link href={destination} className='btn'>
      {label}
    </Link>
  )
}

export default ButtonLink