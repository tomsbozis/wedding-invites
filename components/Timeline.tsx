import { Location } from "@/lib/db.types";
import { getMapLinks } from "@/lib/maps";

export default function Timeline({ locations }: { locations: Location[] }) {
  const sorted = [...locations].sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="flex flex-col gap-6">
      {sorted.map((loc) => {
        const links = getMapLinks(loc.address);

        return (
          <div key={loc.id} className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mb-2">
              <i className={`ti ${loc.icon}`} aria-hidden="true" />
            </div>

            {loc.time && (
              <p className="text-sm text-neutral-500 mb-0.5">{loc.time}</p>
            )}
            <p className="font-medium text-lg mb-0.5">{loc.title}</p>
            <p className="text-sm text-neutral-600 mb-2">{loc.address}</p>
            {loc.description && (
              <p className="text-sm text-neutral-500 mb-2">{loc.description}</p>
            )}

            <div className="flex justify-center gap-1.5">
              <a href={links.google} target="_blank" rel="noopener noreferrer" className="text-xs px-2.5 py-1 border rounded-md">Google</a>
              <a href={links.waze} target="_blank" rel="noopener noreferrer" className="text-xs px-2.5 py-1 border rounded-md">Waze</a>
              <a href={links.apple} target="_blank" rel="noopener noreferrer" className="text-xs px-2.5 py-1 border rounded-md">Apple</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}