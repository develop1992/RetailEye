import { useQuery } from "@tanstack/react-query";
import { fetchShifts } from "../api/shifts";

const useShifts = () =>
    useQuery({ queryKey: ['shifts'], queryFn: fetchShifts });

export default useShifts;