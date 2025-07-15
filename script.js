const latEl = document.getElementById('lat');
const lonEl = document.getElementById('lon');
const netEl = document.getElementById('network');
const locBox = document.getElementById('location-box');

let watchId = null;

// Show network type
if ('connection' in navigator) {
  const type = navigator.connection.effectiveType;
  netEl.textContent = type.toUpperCase();
} else {
  netEl.textContent = "Not supported";
}

// Start tracking location
function startTracking() {
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(pos => {
      latEl.textContent = pos.coords.latitude.toFixed(5);
      lonEl.textContent = pos.coords.longitude.toFixed(5);
    }, err => {
      alert('Location error: ' + err.message);
    });
  } else {
    alert('Geolocation not supported');
  }
}

// Stop tracking location
function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}

// Use Intersection Observer to pause tracking
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startTracking();
    } else {
      stopTracking();
    }
  });
});

observer.observe(locBox);
