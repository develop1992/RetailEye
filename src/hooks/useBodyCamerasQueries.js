import { useQuery } from "@tanstack/react-query";
import { fetchBodyCameras } from "../api/bodyCameras";

const useBodyCameras = () =>
    useQuery({ queryKey: ['body-cameras'], queryFn: fetchBodyCameras });

export default useBodyCameras;