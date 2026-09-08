"use client";
import { useState } from "react";
import Timeline from "@/components/Timeline";
import RsvpForm from "@/components/RsvpForm";
import Calendar from "@/components/Calendar";
import Countdown from "@/components/Countdown";
import SongPlayer from "@/components/SongPlayer";
import MainLocation from "@/components/MainLocation";
import { getWeekdayLv } from "@/lib/date";

type Stage = "closed" | "opening" | "open" | "leaving" | "done";

export default function InvitationReveal({
  invitation,
  locations,
  date,
  mainLocation,
  countdownTarget,
}: {
  invitation: any;
  locations: any[];
  date: string;
  mainLocation: any;
  countdownTarget: string;
}) {
  const [stage, setStage] = useState<Stage>("closed");
  const headingLabel = invitation.new_surname || "Mūsu kāzas";

  function handleOpen() {
    setStage("opening");
    setTimeout(() => setStage("open"), 1300);
    setTimeout(() => setStage("leaving"), 2000);
    setTimeout(() => setStage("done"), 3100);
  }

  const showEnvelope = stage !== "done";

  return (
    <div className="relative">
      {/* Pilnais saturs — renderēts vienmēr, atklājas, kad pārklājs izgaist */}
      <div className="max-w-md mx-auto py-10 px-4 relative z-10">
        <div className="text-center mb-6">
          <p className="font-heading text-sm uppercase tracking-widest text-neutral-400 mb-3">
            {headingLabel}
          </p>
          <h1 className="font-heading text-6xl mb-2">{invitation.couple_names}</h1>
          <p className="text-xl text-neutral-500">
            {getWeekdayLv(new Date(invitation.wedding_date))}, {date}
          </p>
        </div>

        <img
            src="https://shootdotedit.com/images/blog/Erin-Morrison-Photography-0076-_erinm_photography-1.jpg"
            alt="couple"
            className="w-150 h-150"
        />
        <div className="text-center mb-8">
            <p className="text-xl text-neutral-600 leading-relaxed italic">
            </p>
          </div>

        {invitation.invitation_text && (
          <div className="text-center mb-8">
            <p className="text-xl text-neutral-600 leading-relaxed italic">
              {invitation.invitation_text}
            </p>
          </div>
        )}

        {invitation.audio_url && <SongPlayer audioUrl={invitation.audio_url} />}


          <div className="text-center mb-2">
            <p className="text-xl text-neutral-800 leading-relaxed ">
                Līdz lielajam notikumam vēl tikai
            </p>
          </div>

        <Countdown targetDate={countdownTarget} />

        <div className="mb-8">
          <Calendar weddingDate={invitation.wedding_date} />
        </div>

        {mainLocation && <MainLocation location={mainLocation} />}

        <div className="mb-8">
          <h2 className="font-heading text-3xl mb-4 text-center">Dienas plāns</h2>
          <Timeline locations={locations ?? []} />
        </div>

        <div>
          <h2 className="font-heading text-3xl mb-4 text-center">
            Apstiprini ierašanos
          </h2>
          <RsvpForm invitationId={invitation.id} />
        </div>
      </div>

      {/* Aploksnes pārklājs */}
      {showEnvelope && (
        <div className={`envelope-overlay envelope-overlay--${stage}`}>
          <div
            onClick={stage === "closed" ? handleOpen : undefined}
            className={`envelope envelope--${stage}`}
          >
            <div className="envelope__back" />

            <div className="envelope__card">
              <p className="font-heading text-xs uppercase tracking-widest text-neutral-400 mb-2">
                {headingLabel}
              </p>
              <h1 className="font-heading text-3xl mb-1 leading-tight">
                {invitation.couple_names}
              </h1>
              <p className="text-sm text-neutral-500">
                {getWeekdayLv(new Date(invitation.wedding_date))}, {date}
              </p>
            </div>

            <div className="envelope__flap-left" />
            <div className="envelope__flap-right" />

            <div className="envelope__flap-top">
              <div className="envelope__seal">
                {invitation.new_surname?.[0] ?? "♥"}
              </div>
            </div>
          </div>

          {stage === "closed" && (
            <p className="mt-8 text-xs uppercase tracking-widest text-neutral-400 animate-pulse">
              Pieskaries, lai atvērtu
            </p>
          )}
        </div>
      )}
    </div>
  );
}