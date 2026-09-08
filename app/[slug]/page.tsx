import { supabase } from "@/lib/supabase";
import InvitationReveal from "@/components/InvitationReveal";
import { notFound } from "next/navigation";

export default async function InvitationPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: invitation } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single();

  if (!invitation) notFound();

  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .eq("invitation_id", invitation.id)
    .order("order_index");

  const date = new Date(invitation.wedding_date).toLocaleDateString("lv-LV", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const mainLocation = locations?.find((l) => l.is_main);

  const countdownTarget = `${invitation.wedding_date}T${
    mainLocation?.time ? mainLocation.time : "00:00"
  }:00`;

  return (
    <div className="relative min-h-screen">
      {invitation.cover_image_url && (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${invitation.cover_image_url})` }}
        >
          <div className="absolute inset-0 bg-white/80" />
        </div>
      )}

      <InvitationReveal
        invitation={invitation}
        locations={locations ?? []}
        date={date}
        mainLocation={mainLocation}
        countdownTarget={countdownTarget}
      />
    </div>
  );
}