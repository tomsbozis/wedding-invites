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
    <div className="flex flex-col gap-6 max-w-xs mx-auto">
      {sorted.map((loc) => {
        const links = getMapLinks(loc.address);

        return (
          <div key={loc.id} className="text-left">
            {/* Augšējā rinda: gredzenu bilde + laiks + adrese */}
            <div className="flex items-center gap-3">
              <img
                src="/images/rings.webp"
                alt=""
                className="w-10 h-10 object-contain flex-shrink-0"
              />

              {loc.time && (
                <p className="font-medium text-2xl">{loc.time}</p>
              )}

              <p className="font-medium text-lg">{loc.title}</p>
            </div>

            {/* Zemāk: adrese, apraksts, kartes pogas */}
            <div className="pl-[52px] mt-1.5">
              <p className="text-sm text-neutral-600 mb-1.5">{loc.address}</p>
              {loc.description && (
                <p className="text-sm text-neutral-500 mb-2">{loc.description}</p>
              )}

              <div className="flex gap-1.5 mt-1">
                <a href={links.google} target="_blank" rel="noopener noreferrer" className="text-xs px-2.5 py-1 border rounded-md">Google</a>
                <a href={links.waze} target="_blank" rel="noopener noreferrer" className="text-xs px-2.5 py-1 border rounded-md">Waze</a>
                <a href={links.apple} target="_blank" rel="noopener noreferrer" className="text-xs px-2.5 py-1 border rounded-md">Apple</a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}