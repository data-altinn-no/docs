---
title: Request-eksempler
description: Eksempler på hvordan man henter data om en gitt virksomhet
weight: 10
---

{{% notice note %}}
Under arbeid!
{{% /notice %}}

## Generelt

Tilda er tilgjengelig i to miljøer - test.data.altinn.no og data.altinn.no. Man må be om API-nøkkel for produktet "Tilsynsdata" begge steder.

For å kunne bruke data.altinn.no med maskinporten må man få tildelt scope (test.maskinporten.no for test) - altinn:dataaltinnno/tilda
Dette vil bli tildelt alle konsumenter, som selv må inn og provisjonere klienter med tilgang til scopet.

 [Se her for mer informasjon om maskinporten](https://docs.digdir.no/maskinporten_guide_apikonsument.html)

 For mer informasjon om API-ene i data.altinn.no, se [her.](/api/)

Alle kall til data.altinn.no må ha følgende headere:

*Authorization* med bearertoken fra maskinporten

*Ocp-apim-subscription-key* med API-nøkkel fra valgt miljø 

## Kalle på Tilda-apiet

For eksempler på hvordan man kaller Tilda kan man se på hvert element i [datasettoversikten](/tjenester/tilsynsdata/).

Vi anbefaler bruk av "direktehøsting".