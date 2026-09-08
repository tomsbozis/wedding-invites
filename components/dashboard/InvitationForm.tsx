"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { supabase } from "@/lib/supabase";

export type InvitationFormHandle = {
  save: () => Promise<void>;
  saving: boolean;
  savedMsg: boolean;
};

type InvitationFormProps = {
  invitation: any;
  onSaved: () => void;
};

const InvitationForm = forwardRef<InvitationFormHandle, InvitationFormProps>(
  function InvitationForm({ invitation, onSaved }, ref) {
    const [coupleNames, setCoupleNames] = useState(
      invitation.couple_names ?? ""
    );
    const [weddingDate, setWeddingDate] = useState(
      invitation.wedding_date ?? ""
    );
    const [invitationText, setInvitationText] = useState(
      invitation.invitation_text ?? ""
    );
    const [coverImageUrl, setCoverImageUrl] = useState(
      invitation.cover_image_url ?? ""
    );
    const [audioUrl, setAudioUrl] = useState(invitation.audio_url ?? "");
    const [isPublished, setIsPublished] = useState(
      invitation.is_published ?? false
    );
    const [saving, setSaving] = useState(false);
    const [savedMsg, setSavedMsg] = useState(false);

    async function handleSave() {
      setSaving(true);
      setSavedMsg(false);

      const { error } = await supabase
        .from("invitations")
        .update({
          couple_names: coupleNames,
          wedding_date: weddingDate,
          invitation_text: invitationText,
          cover_image_url: coverImageUrl || null,
          audio_url: audioUrl || null,
          is_published: isPublished,
        })
        .eq("id", invitation.id);

      setSaving(false);

      if (!error) {
        setSavedMsg(true);
        onSaved();

        setTimeout(() => {
          setSavedMsg(false);
        }, 2000);
      } else {
        console.error("Kļūda saglabājot ielūgumu:", error);
      }
    }

    useImperativeHandle(ref, () => ({
      save: handleSave,
      saving,
      savedMsg,
    }));

    return (
      <div className="flex flex-col gap-4 text-base">
        <div>
          <label className="text-sm text-neutral-500 block mb-1">
            Pāra vārdi
          </label>
          <input
            type="text"
            value={coupleNames}
            onChange={(e) => setCoupleNames(e.target.value)}
            className="border rounded-md px-3 py-2.5 text-base w-full"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-500 block mb-1">
            Kāzu datums
          </label>
          <input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="border rounded-md px-3 py-2.5 text-base w-full"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-500 block mb-1">
            Uzaicinājuma teksts
          </label>
          <textarea
            value={invitationText}
            onChange={(e) => setInvitationText(e.target.value)}
            rows={3}
            className="border rounded-md px-3 py-2.5 text-base w-full"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-500 block mb-1">
            Fona bildes URL
          </label>
          <input
            type="text"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://..."
            className="border rounded-md px-3 py-2.5 text-base w-full"
          />

          {coverImageUrl && (
            <img
              src={coverImageUrl}
              alt="Priekšskatījums"
              className="mt-2 w-full h-32 object-cover rounded-md"
            />
          )}
        </div>

        <div>
          <label className="text-sm text-neutral-500 block mb-1">
            Mūzikas URL (MP3)
          </label>
          <input
            type="text"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="https://..."
            className="border rounded-md px-3 py-2.5 text-base w-full"
          />
        </div>

        <label className="flex items-center gap-2 text-base">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4"
          />
          Publicēts (redzams viesiem)
        </label>
      </div>
    );
  }
);

InvitationForm.displayName = "InvitationForm";

export default InvitationForm;