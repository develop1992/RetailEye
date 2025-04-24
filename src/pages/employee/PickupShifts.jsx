import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

import { LoadingIndicator } from '@/components';

import useBodyCameras from '@/hooks/useBodyCamerasQueries';
import useShifts from '@/hooks/useShiftsQueries';
import { useMyEmployeeShift, useMyEmployeeShiftCamera } from "@/hooks/useEmployeeShiftsQueries";
import {
    useCreateEmployeeShift,
    useDeleteMyEmployeeShift,
    useAssignCameraToShift,
    useDeleteMyEmployeeShiftCamera
} from '@/hooks/useEmployeeShiftsMutations';

import { getCurrentUser } from '@/utils/auth';

export default function PickupShifts() {
    const { data: shifts = [] } = useShifts();
    const { data: bodyCameras = [] } = useBodyCameras();
    const currentUser = getCurrentUser();

    const { data: assignedShift } = useMyEmployeeShift(currentUser.id);
    const { data: assignedCamera } = useMyEmployeeShiftCamera(currentUser.id);

    const createShiftMutation = useCreateEmployeeShift();
    const assignCameraMutation = useAssignCameraToShift();
    const deleteShiftMutation = useDeleteMyEmployeeShift();
    const deleteCameraMutation = useDeleteMyEmployeeShiftCamera();

    const [selectedShift, setSelectedShift] = useState('');
    const [selectedCamera, setSelectedCamera] = useState('');
    const [loading, setLoading] = useState(false);

    const availableShifts = shifts.filter((s) => s.isAvailable);
    const availableCameras = bodyCameras.filter((c) => c.isAvailable && c.isActive);

    const handleConfirm = async () => {
        if (!selectedShift || !selectedCamera) {
            alert("Please select both a shift and a camera.");
            return;
        }

        try {
            setLoading(true);

            // 1. Create employee shift
            const employeeShiftRes = await createShiftMutation.mutateAsync({
                employeeDto: { id: currentUser.id },
                shiftDto: { id: selectedShift },
            });

            // Add delay here
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // 2. Assign camera to employee shift
            await assignCameraMutation.mutateAsync({
                bodyCameraDto: { id: selectedCamera },
                employeeShiftDto: { id: employeeShiftRes.id },
                startTime: employeeShiftRes.shiftDto.startTime,
                endTime: employeeShiftRes.shiftDto.endTime,
            });

            alert("Shift and camera assigned successfully!");
        } catch (error) {
            console.error("Assignment failed:", error);
            alert("Failed to assign shift and camera.");
        } finally {
            setLoading(false); // ensure it's hidden on both success and error
        }
    };

    const handleCancel = async () => {
        try {
            setLoading(true);

            if (assignedCamera?.id) {
                await deleteCameraMutation.mutateAsync(assignedCamera.id);
            }

            if (assignedShift?.id) {
                await deleteShiftMutation.mutateAsync(assignedShift.id);
            }

            alert("Assignment canceled.");
        } catch (e) {
            alert("Failed to cancel assignment. " + e);
        } finally {
            setLoading(false); // ensure it's hidden on both success and error

            window.location.reload();
        }
    };

    const isAssigned = assignedShift && assignedCamera;

    return (
        <>
            {loading && <LoadingIndicator message="Processing..." />}

            <div className="max-w-3xl mx-auto py-10 space-y-10 text-white">
                <h1 className="text-4xl font-bold text-center text-[#f5a944]">
                    {isAssigned ? 'Your Assigned Shift & Camera' : 'Pick a Shift & Camera'}
                </h1>

                {isAssigned ? (
                    <Card className="bg-white/90 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-gray-800">Assigned</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-gray-700">
                            <p><strong>Shift:</strong> {assignedShift.shiftDto.type} ({assignedShift.shiftDto.startTime} - {assignedShift.shiftDto.endTime})</p>
                            <p><strong>Camera:</strong> {assignedCamera.bodyCameraDto.model} — Serial: {assignedCamera.bodyCameraDto.serialNumber}</p>
                            <Button onClick={handleCancel} className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
                                Cancel Assignment
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <Card className="bg-white/90 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-gray-800">Available Shifts</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Label>Select a Shift</Label>
                                <Select onValueChange={setSelectedShift}>
                                    <SelectTrigger><SelectValue placeholder="Choose a shift" /></SelectTrigger>
                                    <SelectContent>
                                        {availableShifts.map((shift) => (
                                            <SelectItem key={shift.id} value={shift.id}>
                                                {shift.type} — {shift.startTime} to {shift.endTime}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/90 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-gray-800">Available Cameras</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Label>Select a Camera</Label>
                                <Select onValueChange={setSelectedCamera}>
                                    <SelectTrigger><SelectValue placeholder="Choose a camera" /></SelectTrigger>
                                    <SelectContent>
                                        {availableCameras.map((cam) => (
                                            <SelectItem key={cam.id} value={cam.id}>
                                                {cam.model} — Serial: {cam.serialNumber}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        <div className="text-center cursor-pointer">
                            <Button
                                className="bg-[#43af52] hover:bg-[#369544] text-white px-6 py-2 cursor-pointer"
                                disabled={!selectedShift || !selectedCamera}
                                onClick={handleConfirm}
                            >
                                Confirm Pickup
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}