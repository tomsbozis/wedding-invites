# Wedding Invites — MVP skeleton

Digitāls kāzu ielūgumu builder. Pāris izveido ielūgumu, saņem unikālu linku
(piem. `tavsdomēns.lv/anna-janis`), izsūta viesiem; viesi redz dienas plānu,
lokācijas ar Google/Waze/Apple Maps saitēm, un aizpilda RSVP formu.

## Stack
- **Next.js 14** (App Router) — frontend + API routes
- **Supabase** — Postgres datubāze, auth, storage
- **Vercel** — hosting

## Struktūra

```
app/
  [slug]/page.tsx        публiskā ielūguma lapa (viesiem)
  api/rsvp/route.ts      RSVP iesniegšanas endpoint
  dashboard/              (vēl jāveido) — pāra admin panelis
lib/
  supabase.ts             Supabase klients
  maps.ts                 Google/Waze/Apple Maps saišu ģenerators
  db.types.ts              TypeScript tipi datubāzes tabulām
components/
  Timeline.tsx             dienas plāna komponente
  RsvpForm.tsx              RSVP forma
supabase/
  schema.sql                datubāzes shēma
```

## Uzstādīšana

1. `npm install`
2. Izveido projektu [supabase.com](https://supabase.com) (bezmaksas tier pietiek MVP)
3. Palaid `supabase/schema.sql` Supabase SQL editorā
4. Nokopē `.env.example` uz `.env.local`, ieliec Supabase URL un anon key
5. `npm run dev`

## Nākamie soļi (nav vēl šajā skeletā)
- Autentifikācija pārim (Supabase Auth — e-pasts/parole vai magic link)
- Dashboard, kur pāris rediģē ielūgumu un redz RSVP sarakstu
- "Export to Google Sheets" poga (Google Sheets API)
- LV/RU/EN valodu pārslēgs
- Countdown taimeris publiskajā lapā
- Stripe maksājums, ja produktu monetizē
