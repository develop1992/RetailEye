import shifts from '../../data/shifts.json'; // or fetch from API
import bodyCameras from '../../data/body-cameras.json';

export default function PickupShifts() {
    const availableShifts = shifts.filter(s => s.is_available === true);
    const availableCameras = bodyCameras.filter(c => c.isAvailable && c.isActive);

    return (
        <div className="text-white space-y-8">
            <h1 className="text-3xl font-bold text-[#f5a944]">Available Shifts</h1>
            <ul className="list-disc pl-5 space-y-2">
                {availableShifts.map(s => (
                    <li key={s.id}>
                        {s.type} – {s.start_time} to {s.end_time}
                    </li>
                ))}
            </ul>

            <h1 className="text-3xl font-bold text-[#f5a944]">Available Body Cameras</h1>
            <ul className="list-disc pl-5 space-y-2">
                {availableCameras.map(c => (
                    <li key={c.id}>
                        {c.model} (Serial: {c.serialNumber}) – {c.manufacturer}
                    </li>
                ))}
            </ul>
        </div>
    );
};