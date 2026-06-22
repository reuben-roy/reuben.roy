/**
 * Bird Migration Data Parser
 * Utilities for parsing, indexing, and querying bird migration GPS data
 */

/**
 * Process optimized JSON data
 * @param {Object} jsonData - Optimized data object { BirdName: [[t,a,y,x,s],...] }
 * @returns {Array} Flat array of data points with standard structure
 */
export function processLiteData(jsonData) {
  const data = [];
  let idCounter = 0;

  Object.entries(jsonData).forEach(([birdName, points]) => {
    points.forEach(p => {
      // p format: [t, a, y, x, s] -> [timestamp, altitude, lat, lon, speed]
      data.push({
        id: ++idCounter,
        timestamp: new Date(p[0]),
        altitude: p[1],
        latitude: p[2],
        longitude: p[3],
        speed: p[4],
        birdName: birdName,
        direction: 0 // Not available in lite format, usually not visualization critical
      });
    });
  });

  return data.sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * Group data by bird name
 * @param {Array} data - Parsed data array
 * @returns {Object} Object with bird names as keys
 */
export function groupByBird(data) {
  const birds = {};

  for (const point of data) {
    if (!birds[point.birdName]) {
      birds[point.birdName] = [];
    }
    birds[point.birdName].push(point);
  }

  // Sort each bird's data by timestamp
  for (const birdName in birds) {
    birds[birdName].sort((a, b) => a.timestamp - b.timestamp);
  }

  return birds;
}

/**
 * Get the time range of the dataset
 * @param {Array} data - Parsed data array
 * @returns {Object} { start: Date, end: Date }
 */
export function getTimeRange(data) {
  if (!data.length) return { start: new Date(), end: new Date() };

  let start = data[0].timestamp;
  let end = data[0].timestamp;

  for (const point of data) {
    if (point.timestamp < start) start = point.timestamp;
    if (point.timestamp > end) end = point.timestamp;
  }

  return { start, end };
}

/**
 * Get data points up to a specific timestamp
 * @param {Object} birdData - Grouped bird data
 * @param {Date} timestamp - Target timestamp
 * @returns {Object} Object with bird names and their visible points
 */
export function getDataUpToTime(birdData, timestamp) {
  const result = {};

  for (const birdName in birdData) {
    const points = birdData[birdName];
    const visiblePoints = [];

    for (const point of points) {
      if (point.timestamp <= timestamp) {
        visiblePoints.push(point);
      } else {
        break; // Data is sorted, so we can break early
      }
    }

    result[birdName] = visiblePoints;
  }

  return result;
}

/**
 * Get current position for each bird at a given time
 * @param {Object} birdData - Grouped bird data
 * @param {Date} timestamp - Target timestamp
 * @returns {Object} Object with bird names and their current position + stats
 */
export function getCurrentPositions(birdData, timestamp) {
  const positions = {};

  for (const birdName in birdData) {
    const points = birdData[birdName];
    let lastPoint = null;
    let nextPoint = null;

    for (let i = 0; i < points.length; i++) {
      if (points[i].timestamp <= timestamp) {
        lastPoint = points[i];
        nextPoint = points[i + 1] || null;
      } else {
        break;
      }
    }

    if (lastPoint) {
      // Interpolate position if we have a next point
      let position = { lat: lastPoint.latitude, lon: lastPoint.longitude };

      if (nextPoint && nextPoint.timestamp > timestamp) {
        const t = (timestamp - lastPoint.timestamp) / (nextPoint.timestamp - lastPoint.timestamp);
        position = interpolatePosition(
          { lat: lastPoint.latitude, lon: lastPoint.longitude },
          { lat: nextPoint.latitude, lon: nextPoint.longitude },
          t
        );
      }

      positions[birdName] = {
        ...position,
        altitude: lastPoint.altitude,
        speed: lastPoint.speed,
        direction: lastPoint.direction,
        timestamp: lastPoint.timestamp
      };
    }
  }

  return positions;
}

/**
 * Interpolate between two positions
 * @param {Object} p1 - First position { lat, lon }
 * @param {Object} p2 - Second position { lat, lon }
 * @param {number} t - Interpolation factor (0-1)
 * @returns {Object} Interpolated position { lat, lon }
 */
function interpolatePosition(p1, p2, t) {
  return {
    lat: p1.lat + (p2.lat - p1.lat) * t,
    lon: p1.lon + (p2.lon - p1.lon) * t
  };
}

/**
 * Calculate total distance traveled using Haversine formula
 * @param {Array} points - Array of points with latitude/longitude
 * @returns {number} Total distance in kilometers
 */
export function calculateDistance(points) {
  if (points.length < 2) return 0;

  let totalDistance = 0;

  for (let i = 1; i < points.length; i++) {
    totalDistance += haversineDistance(
      points[i - 1].latitude,
      points[i - 1].longitude,
      points[i].latitude,
      points[i].longitude
    );
  }

  return totalDistance;
}

/**
 * Haversine formula to calculate distance between two coordinates
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in kilometers
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Format a date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Bird color palette
 */
export const BIRD_COLORS = {
  Eric: '#ff9f43',   // Warm Amber
  Nico: '#00d9ff',   // Electric Cyan
  Sanne: '#ff6b9d'   // Vivid Magenta
};

/**
 * Get color for a bird
 * @param {string} birdName - Name of the bird
 * @returns {string} Hex color
 */
export function getBirdColor(birdName) {
  return BIRD_COLORS[birdName] || '#ffffff';
}
