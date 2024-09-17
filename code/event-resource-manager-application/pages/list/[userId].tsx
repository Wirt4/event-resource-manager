import dbConnect from "@/middleware/db-connect"
import { LocationType } from "@/mongoose/locations/schema"
import { onUserWishList } from "@/mongoose/locations/services"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData, NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import LocationsList from "@/components/locations-list"
import { ParsedUrlQuery } from "querystring"

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    const { userId } = context.query
    let locations: LocationType[] | [] = []
    try {
        await dbConnect()
        locations = await onUserWishList(userId as string)
    } catch (err: any) {
        console.error('error from connection...')
        console.error({ err })
    }

    return { props: { data: { locations: JSON.stringify(locations), userId: userId } } }
}

const List: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const locations: LocationType[] = JSON.parse(props.data?.locations || "{\"locations\":[]}")
    const userId: string | undefined = props.data?.userId
    const { data: session } = useSession()
    const title = 'The Food Finder - A personal wish list'
    const isCurrentUser = userId && session?.user.fdlst_private_userID === userId

    return (<div>
        <Head>
            <title>{title}</title>
            content = {title}
        </Head>
        <h1>
            {isCurrentUser ? " Your " : " A "}wish list!
        </h1>
        {isCurrentUser && locations?.length === 0 && (
            <>
                <h2>Your list is currently empty! :(</h2>
                <p>Start adding locations to your wish list!</p>
            </>
        )}
        <LocationsList locations={locations} />
    </div>)
}

export default List