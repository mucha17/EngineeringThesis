import { Box, Button, Card, CardActions, Grid } from "@mui/material"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAxios from "../../../../utils/hooks/axiosHook"
import WeatherInfo from "../WeatherInfo"

interface CitySelectorProps {
	currentLocation?: string
}

interface IdType {
	$oid: string
}

interface CityResponseType {
	_id: IdType
	name: string
	description: string
	weather_id: string
}

const CitySelector = (props: CitySelectorProps) => {
	const [cities, setCities] = useState([])

	const axiosInstance = useAxios("http://localhost:8084")
	const requestPath = "/cities"
	useEffect(() => {
		!!axiosInstance.current &&
			axiosInstance.current
				?.get(requestPath)
				.then((response: any) => {
					if (response.status === 200) {
						setCities(response.data)
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
				{cities.map((city: CityResponseType) => {
					return (
						<Grid item xs={4} key={city._id.$oid}>
							<Card>
								<Grid container>
									<Grid item xs={12}>
										<WeatherInfo
											location={city.weather_id}
										/>
									</Grid>
									<Grid item>
										<CardActions>
											<Link
												key={city._id.$oid}
												to={"/museums/" + city._id.$oid}
											>
												<Button
													size="small"
													sx={
														props.currentLocation ===
														city._id.$oid
															? { color: "red" }
															: {}
													}
												>
													Filtruj
												</Button>
											</Link>
										</CardActions>
									</Grid>
								</Grid>
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
					<Link to={"/museums"}>
						<Button size="small">Wyczyść filtrowanie</Button>
					</Link>
				</Box>
			</Grid>
		</Grid>
	)
}

export default CitySelector
