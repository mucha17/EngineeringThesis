import CameraIcon from "@mui/icons-material/PhotoCamera"
import { AppBar, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Header = () => {
	return (
		<AppBar position="relative">
			<Toolbar>
				<CameraIcon sx={{ mr: 2 }} />
				<Typography variant="h6" color="inherit" noWrap>
					<Link
						to="/"
						style={{ textDecoration: "none", color: "#FFFFFF" }}
					>
						Aplikacja webowa Museumify
					</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header
