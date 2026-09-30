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

Kallene autentiseres med et token fra Maskinporten med scopet `altinn:dataaltinnno/tilda` (i testmiljøet fra test.maskinporten.no).

{{< maskinporten-tilgang scope="altinn:dataaltinnno/tilda" produkt="Tilsynsdata" tildeling="Scopet tildeles alle Tilda-konsumenter i både test og produksjon. Du legger det på integrasjonen din selv; mangler det for din virksomhet, ta kontakt på [dan@altinn.no](mailto:dan@altinn.no)." >}}

For mer informasjon om API-ene i data.altinn.no, se [Kom i gang med API](/api/).

Alle kall til data.altinn.no må ha følgende headere:

*Authorization* med bearertoken fra maskinporten

*Ocp-apim-subscription-key* med API-nøkkel fra valgt miljø 

## Kalle på Tilda-apiet

For eksempler på hvordan man kaller Tilda kan man se på hvert element i [datasettoversikten](/tjenester/tilsynsdata/).

Vi anbefaler bruk av "direktehøsting".