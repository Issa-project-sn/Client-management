import React from 'react';
import { VehicleType } from '../types/delivery';

interface Props {
  vehicles: VehicleType[];
  selectedVehicles: string[];
  onChange: (vehicles: string[]) => void;
}

export const VehicleSelector: React.FC<Props> = ({ vehicles, selectedVehicles, onChange }) => {
  const toggleVehicle = (vehicleId: string) => {
    const newSelection = selectedVehicles.includes(vehicleId)
      ? selectedVehicles.filter(id => id !== vehicleId)
      : [...selectedVehicles, vehicleId];
    onChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Types de véhicule acceptés</label>
      <ul className="space-y-2">
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedVehicles.includes(vehicle.id)}
                onChange={() => toggleVehicle(vehicle.id)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">{vehicle.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};