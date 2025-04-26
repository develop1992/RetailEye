import { useQuery } from "@tanstack/react-query";
import { fetchRecordings } from "@/api/recordings";

const useRecordings = () =>
    useQuery({ queryKey: ['recordings'], queryFn: fetchRecordings });

export default useRecordings;