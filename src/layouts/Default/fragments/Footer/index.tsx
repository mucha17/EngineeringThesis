import { Box, Link, Typography } from "@mui/material"

const Copyright = () => {
	return (
		<Box sx={{ pb: 2 }}>
			<Typography variant="body2" color="text.secondary" align="center">
				{"Copyright © "}
				<Link color="inherit" href="#">
					Tomasz Muchowski
				</Link>{" "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		</Box>
	)
}

const Footer = () => {
	return (
		<>
			<Typography variant="h6" align="center" gutterBottom>
				Aplikacja webowa Museumify
			</Typography>
			<Typography
				variant="subtitle1"
				align="center"
				color="text.secondary"
				component="p"
			>
				stworzona na rzecz walidacji prawidłowości działania sieci
				serwisów
			</Typography>
			<Copyright />
		</>
	)
}

export default Footer
