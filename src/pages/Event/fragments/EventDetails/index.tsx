import { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import useAxios from "../../../../utils/hooks/axiosHook"

interface EventsListProps {
	id: string
}

interface EventResponseType {
	id: string
	name: string
	description: string
	image: string
}

const EventDetails = (props: EventsListProps) => {
	const [event, setEvent] = useState<EventResponseType>()

	const axiosInstance = useAxios("http://localhost:8083")
	const requestPath = "/events/" + props.id
	useEffect(() => {
		!!axiosInstance.current &&
			axiosInstance.current
				?.get(requestPath)
				.then((response: any) => {
					if (response.status === 200) {
						setEvent(response.data)
					} else {
						console.log(response)
					}
				})
				.catch((error: any) => {
					console.log(error)
				})
	}, [requestPath, axiosInstance])

	return (
		<Box>
			<Typography
				component="h1"
				variant="h2"
				align="center"
				color="text.primary"
				gutterBottom
			>
				{event?.name}
			</Typography>
			<Typography
				variant="h5"
				align="center"
				color="text.secondary"
				paragraph
			>
				{event?.description}
			</Typography>
			<img
				src={event?.image}
				style={{ maxWidth: "400px" }}
				alt="Obraz wydarzenia"
			/>
		</Box>
	)
}

export default EventDetails
