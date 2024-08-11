import client from "client";

const { gql } = require("@apollo/client")



const handler = async (req, res) => {
console.log("entre");

  const filters = JSON.parse(req.body);
  
  let hasParkingFilter = ``;
  let petFriendlyFilter = ``;
  let minPriceFilter = ``;
  let maxPriceFilter = ``;


  if(filters.hasParking){
hasParkingFilter = `
{compare: EQUAL_TO, value: "1", key: "has_parking"},
`
  }

  if(filters.petFriendly){
hasParkingFilter = `
{compare: EQUAL_TO, value: "1", key: "pet_friendly"},
`
  }

  if(filters.minPrice) {
    petFriendlyFilter = `
     {compare: GREATER_THAN_OR_EQUAL_TO, value: "${filters.minPrice}", key: "price", type: NUMERIC}
    `
  }

  if(filters.maxPrice) {
    petFriendlyFilter = `
     {compare: LESS_THAN_OR_EQUAL_TO, value: "${filters.maxPrice}", key: "price", type: NUMERIC}
    `
  }

  console.log("hasParking", filters);
  try {
    const { data } = await client.query({
      query: gql`
   query AllPropertiesQuery {
  properties(where: {offsetPagination: {size: 3, offset: ${((filters.page-1)*3)}}
  metaQuery: {
      relation: AND
      metaArray:[
      ${petFriendlyFilter}
      ${hasParkingFilter}
      ${minPriceFilter}
      ${maxPriceFilter}
    ]}
  })  {
      pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
      title
      propertyFeatures {
        bathrooms
        bedrooms
        hasParking
        petFriendly
        price
      }
      databaseId
      uri
      featuredImage {
        node {
          uri
          sourceUrl
        }
      }
    }
  }
}
    `
    })

  
    
    return res.status(200).json({ 
      total: data.properties.pageInfo.offsetPagination.total,
      properties: data.properties.nodes })
  } catch (error) {
    console.log("ERROR", e)
  }
}

export default handler;