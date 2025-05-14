const form = document.getElementById("routeForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  const geoKey = "c58a702343f34b37817bc56032d88370"; // Replace with your OpenCage API key

  try {
    const startRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(start)}&key=${geoKey}`);
    const endRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(end)}&key=${geoKey}`);
    const startData = await startRes.json();
    const endData = await endRes.json();

    const startCoord = startData.results[0].geometry;
    const endCoord = endData.results[0].geometry;

    const distance = calculateDistance(startCoord, endCoord);
    const co2 = (distance / 1000) * 120; // Assuming 120g/km CO2 emission

    localStorage.setItem("ecoRouteData", JSON.stringify({
      start, end, startCoord, endCoord, distance, co2
    }));

    window.location.href = "details.html";
  } catch (err) {
    console.error("Error:", err);
    alert("Error fetching location or route.");
  }
});

function calculateDistance(coord1, coord2) {
  const R = 6371e3; // metres
  const φ1 = coord1.lat * Math.PI/180;
  const φ2 = coord2.lat * Math.PI/180;
  const Δφ = (coord2.lat - coord1.lat) * Math.PI/180;
  const Δλ = (coord2.lng - coord1.lng) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d;
}
