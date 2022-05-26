import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAxios from "../../../../utils/hooks/axiosHook"

interface MuseumSelectorProps {
	currentMuseum?: string
}

interface IdType {
	$oid: string
}

interface MuseumResponseType {
	_id: IdType
	name: string
	shortDescription: string
	icon: string
}

const MuseumSelector = (props: MuseumSelectorProps) => {
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
					} else {
						console.log(response)
					}
				})
				.catch((error: any) => {
					console.log(error)
				})
	}, [requestPath, axiosInstance])

	return (
		<Grid container>
			<Grid container item>
				{museums.map((museum: MuseumResponseType) => {
					return (
						<Grid item xs={4} key={museum._id.$oid}>
							<Card>
								<Box sx={{ display: "flex" }}>
									<CardContent sx={{ flex: "1 0 auto" }}>
										<Typography
											component="div"
											variant="h6"
										>
											{museum?.name}
										</Typography>
										<Typography
											variant="subtitle2"
											color="text.secondary"
											component="div"
										>
											{museum?.shortDescription}
										</Typography>
									</CardContent>
									<CardMedia
										component="img"
										sx={{
											maxWidth: "150px",
											maxHeight: "85px",
										}}
										image={museum?.icon}
										alt="Ikona pogody"
									/>
								</Box>
								<CardActions>
									<Link
										key={museum._id.$oid}
										to={"/events/" + museum._id.$oid}
									>
										<Button
											size="small"
											sx={
												props.currentMuseum ===
												museum._id.$oid
													? { color: "red" }
													: {}
											}
										>
											Filtruj
										</Button>
									</Link>
								</CardActions>
							</Card>
						</Grid>
					)
				})}
			</Grid>
			<Grid item xs={12}>
				<Box
					sx={{
						pt: 2,
						marginLeft: "auto",
						marginRight: "auto",
						width: "200px",
					}}
				>
					<Link to={"/events"}>
						<Button size="small">Wyczyść filtrowanie</Button>
					</Link>
				</Box>
			</Grid>
		</Grid>
	)
}

export default MuseumSelector
