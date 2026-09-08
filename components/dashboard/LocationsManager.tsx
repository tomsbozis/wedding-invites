"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Location } from "@/lib/db.types";

export default function LocationsManager({
  invitationId,
}: {
  invitationId: string;
}) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLocations() {
    const { data } = await supabase
      .from("locations")
      .select("*")
      .eq("invitation_id", invitationId)
      .order("order_index");
    setLocations(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadLocations();
  }, [invitationId]);

  async function addLocation() {
    const maxOrder = locations.reduce((m, l) => Math.max(m, l.order_index), -1);
    await supabase.from("locations").insert({
      invitation_id: invitationId,
      title: "Jauna lokācija",
      address: "",
      time: null,
      description: null,
      icon: "ti-map-pin",
      order_index: maxOrder + 1,
      is_main: false,
    });
    loadLocations();
  }

  async function updateLocation(id: string, fields: Partial<Location>) {
    await supabase.from("locations").update(fields).eq("id", id);
  }

  async function setMain(id: string) {
    await supabase
      .from("locations")
      .update({ is_main: false })
      .eq("invitation_id", invitationId);
    await supabase.from("locations").update({ is_main: true }).eq("id", id);
    loadLocations();
  }

  async function deleteLocation(id: string) {
    if (!confirm("Vai tiešām dzēst šo lokāciju?")) return;
    await supabase.from("locations").delete().eq("id", id);
    loadLocations();
  }

  if (loading) return <p className="text-base text-neutral-500">Ielādē...</p>;

  return (
    <div className="flex flex-col gap-4">
      {locations.map((loc) => (
        <div key={loc.id} className="border rounded-md p-4 flex flex-col gap-2.5 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              defaultValue={loc.title}
              onBlur={(e) => updateLocation(loc.id, { title: e.target.value })}
              placeholder="Nosaukums (piem. Ceremonija)"
              className="border rounded-md px-3 py-2 text-base flex-1"
            />
            <input
              type="text"
              defaultValue={loc.time ?? ""}
              onBlur={(e) => updateLocation(loc.id, { time: e.target.value || null })}
              placeholder="14:00"
              className="border rounded-md px-3 py-2 text-base w-28"
            />
          </div>

          <input
            type="text"
            defaultValue={loc.address}
            onBlur={(e) => updateLocation(loc.id, { address: e.target.value })}
            placeholder="Adrese"
            className="border rounded-md px-3 py-2 text-base"
          />

          <input
            type="text"
            defaultValue={loc.description ?? ""}
            onBlur={(e) => updateLocation(loc.id, { description: e.target.value || null })}
            placeholder="Apraksts (nav obligāts)"
            className="border rounded-md px-3 py-2 text-base"
          />

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-neutral-600">
              <input
                type="radio"
                name="main-location"
                checked={loc.is_main}
                onChange={() => setMain(loc.id)}
                className="w-4 h-4"
              />
              Galvenā ceremonijas lokācija
            </label>

            <button
              onClick={() => deleteLocation(loc.id)}
              className="text-sm text-white bg-red-600 hover:bg-red-700 transition-colors px-3 py-1.5 rounded-md font-medium"
            >
              Dzēst
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addLocation}
        className="border-2 border-dashed border-neutral-400 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors rounded-md px-4 py-3 text-base font-medium text-neutral-700 self-start flex items-center gap-2"
      >
        <span className="text-lg leading-none">+</span> Pievienot lokāciju
      </button>

      <p className="text-sm text-neutral-400">
        Izmaiņas laukos saglabājas automātiski, kad pāriet uz nākamo lauku (klikšķini ārpus lauka). Dienas plāns publiskajā lapā automātiski sakārtosies pēc laika (24h formātā, piem. 09:00 pirms 14:00).
      </p>
    </div>
  );
}