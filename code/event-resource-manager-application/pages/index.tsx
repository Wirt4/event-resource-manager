import Head from "next/head"
import dbConnect from "@/middleware/db-connect"
import EventList from "@/components/event-list"
import {EventServices} from "@/mongoose/theater_events/services"
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import {TheaterEventType} from "@/mongoose/theater_events/schema"
/**
 * It's a Next-sim that the function must be named "getStaticProps" and be exported
 * Page does not compile otherwise
 * @returns GetStaticProps
 */
export const getStaticProps: GetStaticProps = async function () {
  let events: TheaterEventType[] | []
  const services = new EventServices()
  try {
    await dbConnect()
    events = await services.findAllEvents()
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
        <title>EPHRAM - Home</title>
        <meta name="description" content="EPHRAM - Event Production House Resources and Management" />
      </Head>
      <h1>E.P.H.R.A.M.</h1>
      <h2>Contents</h2>
      <EventList events={events}/>
    </div>
  )
}

export default Home
