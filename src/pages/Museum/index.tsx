import { useParams } from "react-router"
import MuseumsList from "./fragments/MuseumsList"

const MuseumPage = () => {
	const { location } = useParams()
	if (location !== undefined) {
		return <MuseumsList location={location} />
	} else {
		return <MuseumsList />
	}
}

export default MuseumPage
