// useObjects.ts
export async function fetchObjects({
  lat,
  lon,
  limitation,
  radius = 1000,
}: {
  lat: number;
  lon: number;
  limitation: string;
  radius?: number;
}) {
  const res = await fetch('/api/objects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lon, limitation, radius }),
  });
  return res.json();
}