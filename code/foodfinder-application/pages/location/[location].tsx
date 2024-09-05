import { LocationType } from "@/mongoose/locations/schema"
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
    PreviewData
} from "next"
import LocationDetail from "components/location-details"
import dbConnect from "@/middleware/db-connect"
import { findLocationById } from "@/mongoose/locations/services"
import { ParsedUrlQuery } from "querystring"
import Head from "next/head"

const Location: NextPage = function (props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const location: LocationType = JSON.parse(props.data?.location)
    const title = `Food Finder - Details for ${location?.name}`

    return (<div>
        <Head>
            <title>{title}</title>
            <meta
                name="description"
                content={`The Food Finder. Details for ${location?.name}`} />
        </Head>
        <h1>{location?.name}</h1>
        <LocationDetail location={location} />
    </div>)
}

export const getServerSideProps: GetServerSideProps = async function (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
    let locations: LocationType[] | []
    const locationId = context.query.location
    try {
        await dbConnect()
        locations = await findLocationById([locationId as string])
    } catch (err: any) {
        return { notFound: true }
    }

    return {
        props: {
            data: {
                location: JSON.stringify(locations.pop())
            }
        }
    }
}

export default Location
