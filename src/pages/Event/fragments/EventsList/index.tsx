import { useState, useEffect } from "react"
import {
	Container,
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Box,
} from "@mui/material"
import useAxios from "../../../../utils/hooks/axiosHook"
import EventDetails from "../EventDetails"
import ModalWrapper from "../../../../components/ModalWrapper"
import MuseumSelector from "../MuseumSelector"

interface EventsListProps {
	museum?: string
}

interface IdType {
	$oid: string
}
interface EventResponseType {
	_id: IdType
	name: string
	shortDescription: string
	icon: string
	museum: string
}

const EventsList = (props: EventsListProps) => {
	const [events, setEvents] = useState([])

	const axiosInstance = useAxios("http://localhost:8083")
	const requestPath = "/events"
	useEffect(() => {
		!!axiosInstance.current &&
			axiosInstance.current
				?.get(requestPath)
				.then((response: any) => {
					if (response.status === 200) {
						setEvents(response.data)
					} else {
						console.log(response)
					}
				})
				.catch((error: any) => {
					console.log(error)
				})
	}, [requestPath, axiosInstance])

	return (
		<>
			<Typography
				component="h1"
				variant="h2"
				align="center"
				color="text.primary"
				gutterBottom
			>
				Wydarzenia
			</Typography>
			<Container maxWidth="md">
				<Box sx={{ pb: 2 }}>
					<MuseumSelector currentMuseum={props.museum} />
				</Box>
				<Grid container spacing={4}>
					{events.map((event: EventResponseType) => {
						if (
							props.museum !== undefined &&
							props.museum !== null &&
							props.museum !== ""
						) {
							if (event.museum === props.museum) {
								return (
									<Grid
										item
										key={event._id.$oid}
										xs={12}
										sm={6}
										md={4}
									>
										<Card
											sx={{
												height: "100%",
												display: "flex",
												flexDirection: "column",
											}}
										>
											<CardMedia
												component="img"
												style={{ maxHeight: "100px" }}
												image={event.icon}
												alt="Ikona muzeum"
											/>
											<CardContent sx={{ flexGrow: 1 }}>
												<Typography
													gutterBottom
													variant="h5"
													component="h2"
												>
													{event.name}
												</Typography>
												<Typography>
													{event.shortDescription}
												</Typography>
											</CardContent>
											<CardActions>
												<ModalWrapper
													buttonText={
														"Więcej informacji"
													}
													component={
														<EventDetails
															id={event._id.$oid}
														/>
													}
												/>
											</CardActions>
										</Card>
									</Grid>
								)
							}
						} else
							return (
								<Grid
									item
									key={event._id.$oid}
									xs={12}
									sm={6}
									md={4}
								>
									<Card
										sx={{
											height: "100%",
											display: "flex",
											flexDirection: "column",
										}}
									>
										<CardMedia
											component="img"
											style={{ maxHeight: "100px" }}
											image={event.icon}
											alt="Ikona muzeum"
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography
												gutterBottom
												variant="h5"
												component="h2"
											>
												{event.name}
											</Typography>
											<Typography>
												{event.shortDescription}
											</Typography>
										</CardContent>
										<CardActions>
											<ModalWrapper
												buttonText={"Więcej informacji"}
												component={
													<EventDetails
														id={event._id.$oid}
													/>
												}
											/>
										</CardActions>
									</Card>
								</Grid>
							)
					})}
				</Grid>
			</Container>
		</>
	)
}

export default EventsList
