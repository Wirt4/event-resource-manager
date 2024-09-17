import Head from "next/head"
import dbConnect from "@/middleware/db-connect"
import EventList from "@/components/event-list"
import {findAllEvents} from "@/mongoose/theater_events/services"
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import {TheaterEventType} from "@/mongoose/theater_events/schema"
/**
 * It's a Next-sim that the function must be named "getStaticProps" and be exported
 * Page does not compile otherwise
 * @returns GetStaticProps
 */
export const getStaticProps: GetStaticProps = async function () {
  let events: TheaterEventType[] | []
  try {
    await dbConnect()
    events = await findAllEvents()
  } catch (err: any) {
    return { notFound: true }
  }
  return {
    props: {
      data: { events: JSON.stringify(events) }
    }
  }
}

/**
 *
 * @param props
 * @returns the landing page for the food finder
 */
const Home: NextPage = function (props: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log({props})
  const events: TheaterEventType[] = JSON.parse(props.data?.events)

  return (
    <div>
      <Head>
        <title>Event Resource Manager - Home</title>
        <meta name="description" content="Event Resource Manager - Home" />
      </Head>
      <h1>Welcome to the Event Resource Manager!</h1>
      <EventList events={events}/>
    </div>
  )
}

export default Home
