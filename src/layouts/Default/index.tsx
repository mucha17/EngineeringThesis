import { Outlet } from "react-router"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Header from "./fragments/Header"
import Footer from "./fragments/Footer"
import { Box } from "@mui/material"

const theme = createTheme()

const DefaultLayout = (): JSX.Element => {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Box
				style={{
					display: "flex",
					minHeight: "70vh",
					flexDirection: "column",
				}}
				sx={{
					bgcolor: "background.paper",
					pt: 4,
					pb: 6,
				}}
			>
				<Outlet />
			</Box>
			<Footer />
		</ThemeProvider>
	)
}
export default DefaultLayout
