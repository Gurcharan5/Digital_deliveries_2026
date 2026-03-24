
export type Store = {
  id: string;
  name: string;
  distance: string;
  logo: string;
};

// Helper: Haversine formula to calculate distance in miles
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const fetchNearbyStores = async (lat: number, lon: number): Promise<Store[]> => {
  // Overpass QL Query: Search for supermarkets in a 5km radius
  const query = `
    [out:json];
    (
      node["shop"="supermarket"](around:5000, ${lat}, ${lon});
      way["shop"="supermarket"](around:5000, ${lat}, ${lon});
    );
    out center;
  `;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: 'POST',
      body: query
    });
    const data = await response.json();

    const results = data.elements.map((el: any) => {
      // Handle nodes (lat/lon) or ways (center.lat/center.lon)
      const storeLat = el.lat || el.center.lat;
      const storeLon = el.lon || el.center.lon;
      const dist = getDistance(lat, lon, storeLat, storeLon);

      return {
        id: el.id.toString(),
        name: el.tags.name || "Local Supermarket",
        distance: `${dist.toFixed(1)} miles`,
        distValue: dist, // hidden value for sorting
        // Generic logo if not in your predefined list
        logo: 'https://cdn-icons-png.flaticon.com/512/606/606543.png' 
      };
    });

    // Sort by distance and take top 5
    return results
      .sort((a: any, b: any) => a.distValue - b.distValue)
      .slice(0, 5);

  } catch (error) {
    console.error("Overpass Fetch Error:", error);
    return [];
  }
};