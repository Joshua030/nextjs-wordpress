import BlockRenderer from "components/BlockRenderer/BlockRenderer"
import MainMenu from "components/MainMenu/MainMenu"
import Head from "next/head"

const Page = ({mainMenuItems, callToActionDestinaton, callToActionLabel, blocks,seo}) => {
  return (
    <>
    <Head>
    <title>{seo.title}</title>
    <meta name="description" content={seo.metaDesc} />
    </Head>
    <MainMenu items={mainMenuItems} callToActionLabel={callToActionLabel} callToActionDestinaton={callToActionDestinaton} />
    <div><BlockRenderer blocks={blocks} /></div>;
  </>
)
}

export default Page