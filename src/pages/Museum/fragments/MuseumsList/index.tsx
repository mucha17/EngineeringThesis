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
import CitySelector from "../CitySelector"
import ModalWrapper from "../../../../components/ModalWrapper"
import MuseumDetails from "../MuseumDetails"

interface MuseumsListProps {
	location?: string
}

interface IdType {
	$oid: string
}
interface MuseumResponseType {
	_id: IdType
	name: string
	shortDescription: string
	icon: string
	location: string
}

const MuseumsList = (props: MuseumsListProps) => {
	const [museums, setMuseums] = useState([])

	const axiosInstance = useAxios("http://localhost:8082")
	const requestPath = "/museums"
	useEffect(() => {
		!!axiosInstance.current &&
			axiosInstance.current
				?.get(requestPath)
				.then((response: any) => {
					if (response.status === 200) {
						setMuseums(response.data)
						console.log(response.data)
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
				Muzea
			</Typography>
			<Container maxWidth="md">
				<Box sx={{ pb: 2 }}>
					<CitySelector currentLocation={props.location} />
				</Box>
				<Grid container spacing={4}>
					{museums.map((museum: MuseumResponseType) => {
						if (
							props.location !== undefined &&
							props.location !== null &&
							props.location !== ""
						) {
							if (museum.location === props.location) {
								return (
									<Grid
										item
										key={museum._id.$oid}
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
												image={museum.icon}
												alt="Ikona muzeum"
											/>
											<CardContent sx={{ flexGrow: 1 }}>
												<Typography
													gutterBottom
													variant="h5"
													component="h2"
												>
													{museum.name}
												</Typography>
												<Typography>
													{museum.shortDescription}
												</Typography>
											</CardContent>
											<CardActions>
												<ModalWrapper
													buttonText={
														"Więcej informacji"
													}
													component={
														<MuseumDetails
															id={museum._id.$oid}
														/>
													}
												/>
											</CardActions>
										</Card>
									</Grid>
								)
							}
						} else {
							return (
								<Grid
									item
									key={museum._id.$oid}
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
											image={museum.icon}
											alt="Ikona muzeum"
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography
												gutterBottom
												variant="h5"
												component="h2"
											>
												{museum.name}
											</Typography>
											<Typography>
												{museum.shortDescription}
											</Typography>
										</CardContent>
										<CardActions>
											<ModalWrapper
												buttonText={"Więcej informacji"}
												component={
													<MuseumDetails
														id={museum._id.$oid}
													/>
												}
											/>
										</CardActions>
									</Card>
								</Grid>
							)
						}
						return null
					})}
				</Grid>
			</Container>
		</>
	)
}

export default MuseumsList
