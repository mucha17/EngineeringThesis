import type { RouteProps } from "react-router-dom"
import { Navigate, Outlet } from "react-router-dom"

interface PrivateRouteParams extends RouteProps {
	isAllowed: boolean
	redirectPath: string
}

const PrivateRoute = ({
	isAllowed,
	redirectPath = "/forbidden",
	children,
}: PrivateRouteParams): JSX.Element => {
	if (!isAllowed) {
		return <Navigate to={redirectPath} replace />
	}

	return children ? <>{children}</> : <Outlet />
}
export default PrivateRoute
