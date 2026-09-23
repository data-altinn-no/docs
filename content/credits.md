---
title: Kred
description: Verktøy og åpen kildekode som dokumentasjonen er bygget med
aliases:
 - /cred
---

Dokumentasjonen skrives i markdown og ligger [åpent på GitHub](https://github.com/data-altinn-no/docs). Ved hver endring bygges den med [Hugo](https://gohugo.io/) til en statisk nettside og publiseres til Azure Static Web Apps via GitHub Actions.

Vi står på skuldrene til følgende prosjekter:

* [Hugo](https://gohugo.io/) genererer nettsiden fra markdown-filene.
* [hugo-theme-altinn](https://github.com/Altinn/hugo-theme-altinn) er temaet som gir sidene utseende og navigasjon. Det bygger på [docDock](https://github.com/vjeantet/hugo-theme-docdock) av Valere Jeantet (MIT-lisens).
* [Swagger UI](https://github.com/swagger-api/swagger-ui) viser OpenAPI-spesifikasjonene som interaktive sider.
* [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker) lager genererte eksempelsvar fra JSON-skjemaene i datasettoversikten.
* [highlight.js](https://highlightjs.org/) gir syntaksmarkering i kodeeksempler.
* [jQuery](https://jquery.com/), [clipboard.js](https://clipboardjs.com/), [sticky-sidebar](https://github.com/abouolia/sticky-sidebar) og [Font Awesome](https://fontawesome.com/) brukes til kopiknapper, sidemeny og ikoner.

Datasettoversikten hentes direkte fra det åpne [metadata-API-et til data.altinn.no](https://api.data.altinn.no/v1/public/metadata/evidencecodes), slik at den alltid er oppdatert. Søk i dokumentasjonen gjøres via Google.
