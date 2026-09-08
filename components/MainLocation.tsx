import { getMapLinks } from "@/lib/maps";
import { Location } from "@/lib/db.types";

export default function MainLocation({ location }: { location: Location }) {
  const links = getMapLinks(location.address);

  return (
    <div className="border-2 border-neutral-900 rounded-lg p-4 mb-8 text-center">
     <p className="font-heading text-xl uppercase tracking-widest text-neutral-400 mb-1">
  Ceremonija notiks
</p>
      <p className="font-medium text-base mb-1">{location.title}</p>
      <p className="text-lg text-neutral-600 mb-3">{location.address}</p>
      {location.time && (
        <p className="text-2xl text-neutral-500 mb-3">{location.time}</p>
      )}
      <div className="flex justify-center gap-1.5">
        <a href={links.google} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 border rounded-md">Google</a>
        <a href={links.waze} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 border rounded-md">Waze</a>
        <a href={links.apple} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 border rounded-md">Apple</a>
      </div>
    </div>
  );
}