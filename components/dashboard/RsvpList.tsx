"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RsvpList({ invitationId }: { invitationId: string }) {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("rsvps")
        .select("*")
        .eq("invitation_id", invitationId)
        .order("submitted_at", { ascending: false });
      setRsvps(data ?? []);
      setLoading(false);
    }
    load();
  }, [invitationId]);

  if (loading) return <p className="text-sm text-neutral-500">Ielādē...</p>;

  const attending = rsvps.filter((r) => r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + (r.guest_count ?? 1), 0);

  if (rsvps.length === 0) {
    return <p className="text-sm text-neutral-500">Vēl nav neviena RSVP.</p>;
  }

  return (
    <div>
      <p className="text-sm text-neutral-600 mb-4">
        {attending.length} atbildējuši &quot;jā&quot; ({totalGuests} viesi kopā),{" "}
        {rsvps.length - attending.length} atbildējuši &quot;nē&quot;
      </p>

      <div className="flex flex-col gap-2">
        {rsvps.map((r) => (
          <div key={r.id} className="border rounded-md p-3 text-sm">
            <div className="flex justify-between items-start">
              <span className="font-medium">{r.guest_name}</span>
              <span className={r.attending ? "text-green-600" : "text-red-500"}>
                {r.attending ? `Ieradīsies (${r.guest_count})` : "Nevarēs"}
              </span>
            </div>
            {r.dietary_notes && (
              <p className="text-xs text-neutral-500 mt-1">
                Ēdiena ierobežojumi: {r.dietary_notes}
              </p>
            )}
            {r.message && (
              <p className="text-xs text-neutral-600 mt-1 italic">&quot;{r.message}&quot;</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}