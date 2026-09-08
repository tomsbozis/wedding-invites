"use client";

import { useState } from "react";

export default function RsvpForm({ invitationId }: { invitationId: string }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || attending === null) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitation_id: invitationId,
          guest_name: name,
          attending,
          guest_count: guestCount,
          dietary_notes: dietaryNotes,
          message,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-sm text-neutral-600">Paldies! Tava atbilde ir saņemta.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Tavs vārds"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm"
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setAttending(true)}
          className={`flex-1 border rounded-md px-3 py-2 text-sm ${
            attending === true ? "border-black" : ""
          }`}
        >
          Ieradīšos
        </button>
        <button
          type="button"
          onClick={() => setAttending(false)}
          className={`flex-1 border rounded-md px-3 py-2 text-sm ${
            attending === false ? "border-red-500 text-red-600" : ""
          }`}
        >
          Nevarēšu
        </button>
      </div>

      {attending === true && (
        <>
          <label className="text-xs text-neutral-500">
            Cik cilvēku kopā (ieskaitot tevi)
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="border rounded-md px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Ēdiena alerģijas vai ierobežojumi (nav obligāti)"
            value={dietaryNotes}
            onChange={(e) => setDietaryNotes(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />
        </>
      )}

      <textarea
        placeholder="Novēlējums pārim (nav obligāti)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm"
        rows={2}
      />

      {status === "error" && (
        <p className="text-xs text-red-600">
          Lūdzu, ievadi vārdu un atzīmē, vai ieradīsies.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="border rounded-md px-3 py-2 text-sm font-medium"
      >
        {status === "sending" ? "Sūta..." : "Nosūtīt atbildi"}
      </button>
    </form>
  );
}
