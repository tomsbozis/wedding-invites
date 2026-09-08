export interface Invitation {
  id: string;
  couple_id: string;
  slug: string;
  couple_names: string;
  wedding_date: string; // ISO date
  cover_image_url: string | null;
  theme: string;
  language: "lv" | "ru" | "en";
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  invitation_id: string;
  title: string;
  address: string;
  time: string | null;
  description: string | null;
  icon: string;
  order_index: number;
  is_main: boolean;
  created_at: string;
}

export interface Rsvp {
  id: string;
  invitation_id: string;
  guest_name: string;
  attending: boolean;
  guest_count: number;
  dietary_notes: string | null;
  message: string | null;
  submitted_at: string;
}
