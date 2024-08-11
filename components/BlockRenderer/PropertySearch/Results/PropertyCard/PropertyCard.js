import { faBathtub, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";

const PropertyCard = ({ featuredImage, propertyFeatures, title, uri
}) => {

  return (
    <Link href={uri} className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200">
      <div className="flex w-[100%] h-[200px] relative">
        <Image src={featuredImage.node.sourceUrl} fill priority style={{ objectFit: "cover" }} alt={title} />
      </div>
      <div className="mt-3 text-lg font-bold">
        {title}
      </div>
      <div className="text-lg">
        ${numeral(propertyFeatures.price).format("0,0")}
      </div>
      <div className="flex justify-between text-sm mt-3">
        <div>
          <FontAwesomeIcon icon={faBathtub} />
          <span className="pl-2">{propertyFeatures.bathrooms} bathrooms</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faBed} />
          <span className="pl-2">{propertyFeatures.bedrooms} bedrooms</span>
        </div>
        {
          (!!propertyFeatures.hasParking || propertyFeatures.petFriendly) && <div className="flex justify-between text-sm mt-3">
            <div>{!!propertyFeatures.hasParking && <><FontAwesomeIcon icon={faCar} /> parking available</>}</div>
            <div>{!!propertyFeatures.petFriendly && <><FontAwesomeIcon icon={faDog} /> petFriendly</>}</div>
         
          </div>
        }
      </div>
    </Link>
  )
}

export default PropertyCard