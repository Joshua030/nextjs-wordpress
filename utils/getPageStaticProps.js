import { gql } from "@apollo/client";
import client from "client";
import { mapMainMenuItems } from "./mapMainMenuItems";
import cleanAndTranformBlocks from "./cleanAndTranformBlocks";

export const getPageStaticProps = async (context) => {

  const uri = context.params?.slug ?  `/${context.params.slug.join("/")}/` : "/" ;

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
      nodeByUri(uri: $uri) {
    ... on Page {
      id
      title
      blocks(postTemplate: false)
         seo {
        title
        metaDesc
      }
    }
        ... on Property {
      id
      title
      blocks(postTemplate: false)
         seo {
        title
        metaDesc
      }
    }
     
  }
  acfOptionsMainMenu {
    mainMenu {
        callToActionButton {
        destination {
          ...on Page {
          uri
          }
        }
        label
      }
      menuItems {
        items {
          destination {
            ... on Page {
              uri
            }
          }
          label
        }
        menuItem {
          destination {
            ... on Page {
              uri
            }
          }
          label
        }
      }
  }
}
      }
    `,
    variables: {
      uri,
    }
  });
  return {
    props: {
      seo: data.nodeByUri.seo,
      title: data.nodeByUri.title,
      mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
      callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestinaton: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
      blocks: cleanAndTranformBlocks(data.nodeByUri.blocks),
    },
  };
}