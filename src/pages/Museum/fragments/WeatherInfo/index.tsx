import { CardContent, Typography, CardMedia, Box } from "@mui/material"
import { useState, useEffect } from "react"
import useAxios from "../../../../utils/hooks/axiosHook"

interface WeatherInfoProps {
	location: string | undefined
}

interface Weather {
	location: Location
	current: Current
}

interface CityResponseType {
	_id: string
	name: string
	apiCallLink: string
	weather: Array<Weather>
}
interface Current {
	last_updated_epoch: number
	last_updated: string
	temp_c: number
	temp_f: number
	is_day: number
	condition: Condition
	wind_mph: number
	wind_kph: number
	wind_degree: number
	wind_dir: string
	pressure_mb: number
	pressure_in: number
	precip_mm: number
	precip_in: number
	humidity: number
	cloud: number
	feelslike_c: number
	feelslike_f: number
	vis_km: number
	vis_miles: number
	uv: number
	gust_mph: number
	gust_kph: number
}

export interface Condition {
	text: string
	icon: string
	code: number
}

export interface Location {
	name: string
	region: string
	country: string
	lat: number
	lon: number
	tz_id: string
	localtime_epoch: number
	localtime: string
}

const WeatherInfo = (props: WeatherInfoProps) => {
	const [city, setCity] = useState<CityResponseType>()

	const url = "http://localhost:8085"
	const axiosInstance = useAxios(url)
	const requestPath = "/api/cities/" + props.location

	useEffect(() => {
		!!axiosInstance.current &&
			axiosInstance.current
				?.get(requestPath)
				.then((response: any) => {
					if (response.status === 200) {
						setCity(response.data)
					} else {
						console.log(response)
					}
				})
				.catch((error: any) => {
					console.log(error)
				})
	}, [requestPath, axiosInstance])

	if (
		props.location !== undefined &&
		props.location !== null &&
		props.location !== ""
	) {
		return (
			<Box sx={{ display: "flex" }}>
				<CardContent sx={{ flex: "1 0 auto" }}>
					<Typography component="div" variant="h6">
						{city?.name}
					</Typography>
					<Typography
						variant="subtitle2"
						color="text.secondary"
						component="div"
					>
						{city?.weather[0]?.current?.temp_c}
						{" stopni Celcjusza"}
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					sx={{ width: 151 }}
					image={city?.weather[0]?.current?.condition?.icon}
					alt="Ikona pogody"
				/>
			</Box>
		)
	} else {
		return null
	}
}

export default WeatherInfo
