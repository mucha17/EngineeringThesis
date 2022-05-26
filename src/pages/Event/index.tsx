import { useParams } from "react-router"
import EventsList from "./fragments/EventsList"

const EventPage = () => {
	const { museum } = useParams()
	if (museum !== undefined) {
		return <EventsList museum={museum} />
	} else {
		return <EventsList />
	}
}

export default EventPage
