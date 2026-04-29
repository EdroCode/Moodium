# 🟣 moodiUM

> Log your mood. See the pattern. Understand yourself.

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org) &nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org) &nbsp;
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com) &nbsp;
[![Supabase](https://img.shields.io/badge/Supabase-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com) &nbsp;
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com) &nbsp;
[![Bun](https://img.shields.io/badge/Bun-black?style=for-the-badge&logo=bun)](https://bun.sh)

---

moodiUM is a personal mood journal. Just honest data about how your days actually feel.

---

## Running locally

You'll need [Bun](https://bun.sh), a [Supabase](https://supabase.com) project, and a [Clerk](https://clerk.com) app set up first.

```bash
git clone https://github.com/yourusername/moodium.git
cd moodium
bun install
```

Create a `.env` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Create the database table in Supabase SQL editor:

```sql
create table mood_entries (
  id text primary key,
  user_id text not null,
  date date not null,
  mood text not null,
  note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, date)
);
```

Then:

```bash
bun dev
```

---

## Structure

```
src/
├── app/               — pages (dashboard, calendar, insights, auth)
├── components/        — UI components (MoodEntry, MoodStreak, WeekResume, etc.)
├── hooks/
│   └── useMoodEntries.ts   — shared data hook
└── lib/
    ├── supabase.ts    — db client
    ├── moodUtils.ts   — streak, stats, summary functions
    └── quotes.ts      — quote data
```

---

## License

MIT.
