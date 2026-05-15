# Maha Spa — mahaspa.vn

Website spa booking + CMS (kiểu WordPress) cho Maha Spa Đà Nẵng.

**Stack:** Laravel 11 · Inertia.js · React 18 + TypeScript · TailwindCSS · Filament v3 · MySQL · Redis

## Quick start

```bash
# Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve

# Frontend (mở tab mới)
npm install
npm run dev
```

Admin panel: <http://localhost:8000/admin>

## Tài liệu

- [`CLAUDE.md`](./CLAUDE.md) — spec kỹ thuật, modules, models, API
- [`SPRINTS.md`](./SPRINTS.md) — roadmap 6 sprint MVP

## License

Proprietary © Maha Spa.
