# Amerilist Web Design (sitio Next.js)

Sitio corporativo en [Next.js](https://nextjs.org) 16 (App Router), TypeScript y Tailwind CSS.

**Repositorio:** [github.com/amerilistdms/webdesignsolutions](https://github.com/amerilistdms/webdesignsolutions)

## Requisitos

- Node.js 20+ (recomendado LTS)
- npm (incluido con Node)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Comprobación antes de subir cambios

```bash
npm run lint
npm run build
```

## Enlazar este proyecto con GitHub

Si la carpeta aún no tiene el remoto configurado:

```bash
git remote add origin https://github.com/amerilistdms/webdesignsolutions.git
git branch -M main
git push -u origin main
```

Si `origin` ya existe y apunta a otra URL:

```bash
git remote set-url origin https://github.com/amerilistdms/webdesignsolutions.git
```

## Qué no se sube a GitHub

En `.gitignore` ya están excluidos, entre otros: `node_modules/`, `.next/`, variables `.env*`, carpeta `.vercel/` y cachés. No hace falta borrarlos a mano; Git los ignora al hacer commit.

## Despliegue en la web

Cualquier plataforma con soporte Next.js (por ejemplo [Vercel](https://vercel.com)) puede usar el comando de build por defecto: `npm run build` y el directorio de salida que indique el proveedor (en Vercel suele detectarse solo).
