export const calculateDeliveryPrice = (
  distance: number,
  vehicleTypes: string[],
  cashCollection: boolean,
  cashAmount: number
): number => {
  // Prix de base
  const basePrice = 1000;

  // Supplément par type de véhicule
  const vehiclePrices = {
    bike: 500,
    scooter: 800,
    car: 1200,
    van: 2000,
    truck: 3000
  };

  // Sélectionner le véhicule le plus cher
  const vehiclePrice = vehicleTypes.length > 0
    ? Math.max(...vehicleTypes.map(v => vehiclePrices[v as keyof typeof vehiclePrices]))
    : 0;

  // Frais de collecte d'argent (0.5% du montant à collecter)
  const collectionFee = cashCollection ? Math.max(200, cashAmount * 0.005) : 0;

  // Prix total
  return basePrice + vehiclePrice + collectionFee;
};