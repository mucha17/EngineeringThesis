import { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import useAxios from "../../../../utils/hooks/axiosHook"

interface MuseumDetailsProps {
	id: string
}

interface MuseumResponseType {
	id: string
	name: string
	description: string
	image: string
}

const MuseumDetails = (props: MuseumDetailsProps) => {
	const [museum, setMuseum] = useState<MuseumResponseType>()

	const axiosInstance = useAxios("http://localhost:8082")
	const requestPath = "/museums/" + props.id
	useEffect(() => {
		!!axiosInstance.current &&
			axiosInstance.current
				?.get(requestPath)
				.then((response: any) => {
					if (response.status === 200) {
						setMuseum(response.data)
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
				{museum?.name}
			</Typography>
			<Typography
				variant="h5"
				align="center"
				color="text.secondary"
				paragraph
			>
				{museum?.description}
			</Typography>
			<img
				src={museum?.image}
				style={{ maxWidth: "400px" }}
				alt="Obraz muzeum"
			/>
		</Box>
	)
}

export default MuseumDetails
