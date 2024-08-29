import Head from "next/head"
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"

import LocationsList from "@/components/locations-list"
import dbConnect from "@/middleware/db-connect"
import { findAllLocations } from "@/mongoose/locations/services"
import { LocationType } from "@/mongoose/locations/schema"
/**
 * It's a Next-sim that the function must be named "getStaticProps" and be exported
 * Page does not compile otherwise
 * @returns GetStaticProps
 */
export const getStaticProps: GetStaticProps = async function () {
  let locations: LocationType[] | []
  try {
    await dbConnect()
    locations = await findAllLocations()
  } catch (err: any) {
    return { notFound: true }
  }
  return {
    props: {
      data: { locations: JSON.stringify(locations) }
    }
  }
}
/**
 * 
 * @param props 
 * @returns the landing page for the food finder
 */
const Home: NextPage = function (props: InferGetStaticPropsType<typeof getStaticProps>) {
  const locations: LocationType[] = JSON.parse(props.data?.locations)

  return (
    <div>
      <Head>
        <title>The Food Finder - Home</title>
        <meta name="description" content="The Food Finder - Home" />

        <h1>Welcome to the Food Finder!</h1>
        <LocationsList locations={locations} />
      </Head>
    </div>
  )
}

export default Home
