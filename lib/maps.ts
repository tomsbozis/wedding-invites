/**
 * Ģenerē saites uz Google Maps, Waze un Apple Maps no adreses teksta.
 * Nav vajadzīga maksas API — visi trīs pakalpojumi atbalsta
 * vienkāršu adreses meklēšanu caur URL.
 */
export function getMapLinks(address: string) {
  const encoded = encodeURIComponent(address);

  return {
    google: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    waze: `https://waze.com/ul?q=${encoded}`,
    apple: `https://maps.apple.com/?q=${encoded}`,
  };
}

/**
 * Ja vēlāk gribi precīzākas saites ar koordinātām (nevis tikai adreses tekstu),
 * izmanto Google Geocoding API, lai adresi pārvērstu lat/lng, un tad:
 * - Google: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
 * - Waze:   `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`
 * - Apple:  `https://maps.apple.com/?ll=${lat},${lng}`
 * Tas dod precīzāku navigāciju, bet prasa Google Maps Platform kontu
 * (bezmaksas kvota parasti pietiek maza mēroga produktam).
 */
