# Voor Naomi ♡

Persoonlijk verjaardagsavontuur in React, TypeScript en Vite. Drie planningsopdrachten openen achtereenvolgens een Nespresso-koffiebeker, parfum en een weekend weg samen. Ontworpen voor mobiel en desktop.

## Ontwikkelen

Gebruik Node.js 22 of nieuwer. Installeer met `npm ci`, start met `npm run dev` en controleer met `npm run build`.

## Publiceren

Selecteer in GitHub **Settings → Pages → Build and deployment → Source: GitHub Actions**. Na het mergen naar `main` bouwt en publiceert de workflow de website op https://svenschuitemaker.github.io/verjaardag-naomi/. Pull requests krijgen alleen een buildcontrole. Er zijn geen secrets nodig.

## Persoonlijk maken

De drie hoofdstukken, opdrachten, codehashes en cadeauomschrijvingen staan bovenaan `src/main.tsx` in `chapters`. De opdrachten zijn een sportdag plannen, een avond uit eten plannen en een weekend weg plannen. De pagina toont elke opdracht met daaronder een cadeau op slot. Zodra jullie een datum hebben afgesproken, geeft Sven de bijbehorende code. De code wordt genormaliseerd (hoofdletters, spaties en koppeltekens tellen niet mee) en gecontroleerd met SHA-256. Codes staan niet leesbaar in de app. Kleuren en vormgeving staan in `src/style.css`. De bestemming van het weekend wordt nog niet genoemd.

Voortgang wordt lokaal in de browser opgeslagen; een ander apparaat of gewiste browsergegevens start opnieuw. Onderaan staat een knop om opnieuw te beginnen met bevestiging. Dit is een speelse onthulling: cadeaus zijn in de broncode terug te vinden. De repository en GitHub Pages zijn openbaar; zet geen privégegevens of boekingscodes in de code. Lettertypen worden geladen via Google Fonts, met lokale terugvallettertypen.

## Handmatige controle

Open hoofdstuk 1: alleen de opdracht om een sportdag te plannen en een codeveld zijn zichtbaar. Een foutieve code toont een melding en ontgrendelt niets. Voer de juiste code van Sven in: pas dan verschijnt het cadeau en wordt de volgende opdracht beschikbaar. Herhaal voor een avond uit eten plannen en een weekend weg plannen. Controleer dat de oude quizantwoorden niet werken, voortgang na herladen bewaard blijft, en opnieuw beginnen en annuleren werken. De activiteiten gebruiken een nieuwe opslagsleutel, zodat oude quizvoortgang geen cadeaus vrijgeeft. Controleer ook op een smal scherm en met toetsenbord.
