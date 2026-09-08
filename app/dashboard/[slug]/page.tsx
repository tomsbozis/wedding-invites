"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import InvitationForm, {
  InvitationFormHandle,
} from "@/components/dashboard/InvitationForm";
import LocationsManager from "@/components/dashboard/LocationsManager";
import RsvpList from "@/components/dashboard/RsvpList";

type DashboardPageProps = {
  params: {
    slug: string;
  };
};

export default function DashboardPage({ params }: DashboardPageProps) {
  const [invitation, setInvitation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const formRef = useRef<InvitationFormHandle>(null);

  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  async function loadInvitation() {
    setLoading(true);

    const { data, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("slug", params.slug)
      .single();

    if (error) {
      console.error("Kļūda ielādējot ielūgumu:", error);
      setInvitation(null);
    } else {
      setInvitation(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadInvitation();
  }, [params.slug]);

  async function handleSaveClick() {
    if (!formRef.current) return;

    setSaving(true);
    setSavedMsg(false);

    await formRef.current.save();

    setSaving(false);
    setSavedMsg(true);

    setTimeout(() => {
      setSavedMsg(false);
    }, 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 p-8 text-center text-neutral-500 text-lg">
        Ielādē...
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-neutral-100 p-8 text-center text-neutral-500 text-lg">
        Ielūgums nav atrasts.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-medium">
            Dashboard: {invitation.couple_names}
          </h1>

          <a
            href={`/${invitation.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-blue-600 underline whitespace-nowrap"
          >
            Skatīt publisko lapu
          </a>
        </div>

        <section className="mb-6 border rounded-lg p-5 bg-white">
          <h2 className="font-medium text-xl mb-4">
            Pamata informācija
          </h2>

          <InvitationForm
            ref={formRef}
            invitation={invitation}
            onSaved={loadInvitation}
          />
        </section>

        <section className="mb-10 border rounded-lg p-5 bg-white">
          <h2 className="font-medium text-xl mb-4">
            Dienas plāns / Lokācijas
          </h2>

          <LocationsManager invitationId={invitation.id} />
        </section>

        <button
          onClick={handleSaveClick}
          disabled={saving}
          className="border rounded-md px-5 py-2.5 text-base font-medium bg-neutral-900 text-white mb-10 w-full disabled:opacity-50"
        >
          {saving
            ? "Saglabā..."
            : savedMsg
            ? "Saglabāts ✓"
            : "Saglabāt izmaiņas"}
        </button>

        <section className="border rounded-lg p-5 bg-white">
          <h2 className="font-medium text-xl mb-4">
            RSVP atbildes
          </h2>

          <RsvpList invitationId={invitation.id} />
        </section>
      </div>
    </div>
  );
}