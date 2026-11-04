# Voor Naomi ♡

Persoonlijk verjaardagsavontuur in React, TypeScript en Vite. Drie puzzels openen achtereenvolgens een Nespresso-koffiebeker, parfum en een weekend weg samen. Ontworpen voor mobiel en desktop.

## Ontwikkelen

Gebruik Node.js 22 of nieuwer. Installeer met `npm ci`, start met `npm run dev` en controleer met `npm run build`.

## Publiceren

Selecteer in GitHub **Settings → Pages → Build and deployment → Source: GitHub Actions**. Na het mergen naar `main` bouwt en publiceert de workflow de website op https://svenschuitemaker.github.io/verjaardag-naomi/. Pull requests krijgen alleen een buildcontrole. Er zijn geen secrets nodig.

## Persoonlijk maken

De drie hoofdstukken, vragen, antwoorden, hints en cadeauomschrijvingen staan bovenaan `src/main.tsx` in `chapters`. De teksten zijn eerste voorstellen; vervang ze door jullie eigen herinneringen. Kleuren en vormgeving staan in `src/style.css`. De bestemming van het weekend wordt nog niet genoemd.

Voortgang wordt lokaal in de browser opgeslagen; een ander apparaat of gewiste browsergegevens start opnieuw. Onderaan staat een knop om opnieuw te beginnen met bevestiging. Dit is een speelse onthulling: antwoorden en cadeaus zijn in de broncode terug te vinden. De repository en GitHub Pages zijn openbaar; zet geen privégegevens of boekingscodes in de code. Lettertypen worden geladen via Google Fonts, met lokale terugvallettertypen.

## Handmatige controle

Open hoofdstuk 1, probeer een fout antwoord, kies het juiste antwoord. Hoofdstuk 2 komt vrij; antwoord `uit eten`. Hoofdstuk 3: antwoord `Groningen`. Controleer de drie onthullingen, herlaad om opgeslagen voortgang te testen, bekijk eerdere cadeaus en controleer opnieuw beginnen en annuleren. Controleer ook op een smal scherm en met toetsenbord.
