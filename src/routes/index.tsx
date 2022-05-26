import { Routes, Route } from "react-router-dom"
import PrivateRoute from "./functions/PrivateRoute"
import DefaultLayout from "../layouts/Default"
import HomePage from "../pages/Home"
import NotFoundPage from "../pages/NotFound"
import ForbiddenPage from "../pages/Forbidden"
import MuseumPage from "../pages/Museum"
import EventPage from "../pages/Event"

export const AppRouter = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<DefaultLayout />}>
				<Route index element={<HomePage />} />
				<Route path="museums" element={<MuseumPage />}>
					<Route path=":location" element={<MuseumPage />} />
				</Route>
				<Route path="events" element={<EventPage />}>
					<Route path=":museum" element={<EventPage />} />
				</Route>
				<Route
					element={
						<PrivateRoute
							isAllowed={true}
							redirectPath="/forbidden"
						/>
					}
				>
					<Route path="admin" element={<HomePage />} />
				</Route>
				<Route path="forbidden" element={<ForbiddenPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	)
}
