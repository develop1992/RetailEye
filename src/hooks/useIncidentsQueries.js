import { useQuery } from "@tanstack/react-query";
import { fetchIncidents } from "@/api/incidents";

const useIncidents = () =>
    useQuery({ queryKey: ['incidents'], queryFn: fetchIncidents });

export default useIncidents;