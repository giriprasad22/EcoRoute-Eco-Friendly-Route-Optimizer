// Average CO2 emission in grams per km per person (values are approximations)
const emissionsPerKm = {
    car: 120,
    bicycle: 0,
    train: 41,
    bus: 70,
    aeroplane: 255,
    bike: 90,
    scooty: 80
  };
  
  // Dummy distance in kilometers (replace with actual from your app)
  const distanceInKm = localStorage.getItem('eco_distance_km') || 10;
  
  const tableBody = document.getElementById("emission-table-body");
  
  for (const [vehicle, emissionPerKm] of Object.entries(emissionsPerKm)) {
    const totalCO2 = (emissionPerKm * distanceInKm).toFixed(2);
  
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}</td>
      <td>${emissionPerKm}</td>
      <td>${totalCO2}</td>
    `;
    tableBody.appendChild(row);
    
    

  }
  