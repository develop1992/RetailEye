import {
    useEmployees,
    useShifts,
    useBodyCameras,
    useRecordings,
    useIncidents
} from '../../hooks/useRetaileyeQueries';
import { ScallopedBadge, LoadingIndicator } from "../../components";

export default function Dashboard() {
    const { data: employees = [], isLoading: loadingEmployees } = useEmployees();
    const { data: shifts = [], isLoading: loadingShifts } = useShifts();
    const { data: cameras = [], isLoading: loadingCameras } = useBodyCameras();
    const { data: recordings = [], isLoading: loadingRecordings } = useRecordings();
    const { data: incidents = [], isLoading: loadingIncidents } = useIncidents();

    const isLoading = loadingEmployees || loadingShifts || loadingCameras || loadingRecordings || loadingIncidents;

    return (
        <div className="flex flex-col p-8 bg-[#0a0aa1] min-h-screen">
            <h1 className="text-4xl font-bold text-[#f5a944] mb-30">Dashboard</h1>
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <LoadingIndicator message="Loading RetailEye data..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                    {[
                        { label: 'Employees', count: employees.length },
                        { label: 'Shifts', count: shifts.length },
                        { label: 'Body Cameras', count: cameras.length },
                        { label: 'Recordings', count: recordings.length },
                        { label: 'Incidents', count: incidents.length },
                    ].map(({ label, count }) => (
                        <div key={label} className="flex justify-center">
                            <ScallopedBadge key={label} label={label} count={count} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};