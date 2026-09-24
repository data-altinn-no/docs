---
title: Eksempler
description: Request-eksempler mot data.altinn.no, og Tilda Demo med datamodeller, veiledninger og API-dokumentasjon
weight: 20
---

{{% notice info %}}
**Datamodeller, veiledninger, API-dokumentasjon og eksempeldata for Tilda er samlet på [Tilda Demo](https://data-altinn-no.github.io/tilda-demo/).** 

Dokumentasjonen her på docs.data.altinn.no dekker selve kallene mot data.altinn.no.
{{% /notice %}}

## Hva finner du på Tilda Demo?

[Tilda Demo](https://data-altinn-no.github.io/tilda-demo/) er et eget nettsted som viser hvordan Tilda-tjenesten kan tas i bruk hos en tilsynsmyndighet, og som samler den utfyllende dokumentasjonen for tjenesten. Alle data som vises der er syntetiske. Nettstedet er delt inn i disse delene, som du navigerer til fra menyen øverst på siden:

- **Tilsynsdashboard** – en demonstrasjon av hvordan Tilda-data kan presenteres hos en tilsynsmyndighet, med oppslag på virksomhet, tilsynsrapporter, koordinering, kart over funn og trendanalyser.
- **Veiledninger** – for både datakonsumenter og dataprodusenter, om hvordan du tar Tilda i bruk.
- **Datamodeller** – strukturer, felter og relasjoner for tilsynsrapporter, tilsynskoordineringer, meldinger til annen myndighet (MTAM) og Tilda-enheter. Dette erstatter de tidligere eksempelsidene som lå her.
- **API** – teknisk dokumentasjon for Tilda REST API med endepunkter, autentisering og kodeeksempler.
- **Kode** – GitHub-repositorier, kodeeksempler og lenker til relevante ressurser for integrasjon.
- **Testdata** – syntetiske datasett for utvikling og testing av integrasjoner.
- **Statistikk** – oppdatert statistikk om dataflyten i Tilda-tjenesten.
- **Økonomiske data** – dokumentasjon av vurderingsalgoritmen for økonomisk helhetsvurdering, med indikatorer, Altman Z-score, røde flagg og bransjesammenligning.

## Request-eksempler mot data.altinn.no

Sidene under viser hvordan forespørsler mot data.altinn.no utformes for Tilda-datasettene, med påkrevde headere, parametre og eksempler på request og response.

{{% children description="true" /%}}
