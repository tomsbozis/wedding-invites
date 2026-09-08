"use client";
import { useState } from "react";
import Timeline from "@/components/Timeline";
import RsvpForm from "@/components/RsvpForm";
import Calendar from "@/components/Calendar";
import Countdown from "@/components/Countdown";
import SongPlayer from "@/components/SongPlayer";
import MainLocation from "@/components/MainLocation";
import { getWeekdayLv } from "@/lib/date";

type Stage = "closed" | "opening" | "revealed";

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

  function handleOpen() {
    setStage("opening");
    setTimeout(() => setStage("revealed"), 1400);
  }

  if (stage !== "revealed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div
          onClick={stage === "closed" ? handleOpen : undefined}
          className={`envelope ${stage === "opening" ? "envelope--opening" : ""}`}
        >
          <div className="envelope__back" />

          <div className="envelope__card">
            <p className="font-heading text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Mūsu kāzas
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
          <div className="envelope__flap-top" />
          <div className="envelope__flap-bottom" />

          <div className="envelope__seal">
            {invitation.couple_names?.[0] ?? "♥"}
          </div>
        </div>

        {stage === "closed" && (
          <p className="mt-8 text-xs uppercase tracking-widest text-neutral-400 animate-pulse">
            Pieskaries, lai atvērtu
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4 relative z-10 animate-fadeIn">
      <div className="text-center mb-6">
        <p className="font-heading text-sm uppercase tracking-widest text-neutral-400 mb-3">
          Mūsu kāzas
        </p>
        <h1 className="font-heading text-6xl mb-2">{invitation.couple_names}</h1>
        <p className="text-xl text-neutral-500">
          {getWeekdayLv(new Date(invitation.wedding_date))}, {date}
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
  );
}