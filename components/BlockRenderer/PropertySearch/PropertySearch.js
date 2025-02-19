import { useCallback, useEffect, useState } from "react"
import Results from "./Results/Results";
import Pagination from "./Pagination/Pagination";
import { useRouter } from "next/router";
import queryString from "query-string"
import Filters from "./Filters/Filters";

const PropertySearch = () => {
  const [properties, setProperties] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const pageSize = 3;
  const router = useRouter();

  const handlePageClick = async (pageNumber) => {
    const {petFriendly, hasParking, minPrice, maxPrice } =queryString.parse(window.location.search);
    await router.push(`${router.query.slug.join("/")}?page=${pageNumber}&petFriendly=${petFriendly==="true"}&hasParking=${hasParking==="true"}&minPrice=${minPrice}&maxPrice=${maxPrice}`, null, {
      shallow: true,
    })
   search()
  }

  const search = useCallback(async () => {
    const { page, minPrice,maxPrice,hasParking, petFriendly } = queryString.parse(window.location.search)

    const filters = {};

    if(minPrice){
      filters.minPrice = parseInt(minPrice);   
    }
    if(maxPrice){
      filters.maxPrice = parseInt(maxPrice);   
    }
    
    if(hasParking ==="true") {
      filters.hasParking = true
    }

    if(petFriendly ==="true") {
      filters.petFriendly = true
    }

    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({ 
        page : parseInt(page || 1),
        ...filters
      }),
    });
    const data = await response.json();
    setProperties(data.properties);
    setTotalResults(data.total);
  }, []);


  useEffect(() => {
    search()
  }, [search])

  const handleSearch = async ({ petFriendly, hasParking, minPrice, maxPrice }) => {
    await router.push(`${router.query.slug.join("/")}?page=${1}&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`, null, {
      shallow: true,
    })
    search()
  }

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination totalPages={Math.ceil(totalResults / pageSize)} onPageClick={handlePageClick} />
    </div>
  )
}

export default PropertySearch