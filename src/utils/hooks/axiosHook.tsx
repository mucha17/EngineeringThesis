import { useEffect, useRef, MutableRefObject } from "react"
import axios from "axios"
import type { AxiosInstance } from "axios"

const useAxios = (
	baseURL: string
): MutableRefObject<AxiosInstance | undefined> => {
	const axiosInstance = useRef<AxiosInstance>()

	useEffect(() => {
		axiosInstance.current = axios.create({
			baseURL,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				crossDomain: true,
			},
		})

		return () => {
			axiosInstance.current = undefined
		}
	}, [baseURL])

	return axiosInstance
}

export default useAxios
