import { Box, Button, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const HomePage = (): JSX.Element => {
	return (
		<Box>
			<Typography
				component="h1"
				variant="h2"
				align="center"
				color="text.primary"
				gutterBottom
			>
				Museumify
			</Typography>
			<Typography
				variant="h5"
				align="center"
				color="text.secondary"
				paragraph
			>
				Skupiamy się na szerzeniu kultury oraz poszerzaniu dostępności
				informacji o wydarzeniach kulturowych odbywających się w
				zindeksowanych przez nas system muzeach.
			</Typography>
			<Stack
				sx={{ pt: 4 }}
				direction="row"
				spacing={2}
				justifyContent="center"
			>
				<Link to={"museums"}>
					<Button variant="contained">Przejdź do muzeów</Button>
				</Link>
				<Link to={"events"}>
					<Button variant="outlined">Przejdź do wydarzeń</Button>
				</Link>
			</Stack>
		</Box>
	)
}
export default HomePage
