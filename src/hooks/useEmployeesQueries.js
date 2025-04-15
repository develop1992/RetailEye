import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../api/employees";

const useEmployees = () =>
    useQuery({ queryKey: ['employees'], queryFn: fetchEmployees });

export default useEmployees;