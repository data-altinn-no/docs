---
title: Spørsmål og svar om data.altinn.no
linktitle: Spørsmål og svar
description: Korte svar på det vi oftest blir spurt om, og hvor du finner resten.
weight: 80
---

## Lagrer data.altinn.no dataene?

Nei. data.altinn.no formidler data fra kilden til konsumenten og lagrer bare metadata om selve uthentingen: hvem som spurte, hvem dataene gjelder, hvilke datasett som ble hentet og når.

## Hvor kjører løsningen, og hvem drifter den?

data.altinn.no er en skyløsning på Microsoft Azure, på samme måte som Altinn Studio og Altinn 3. Digitaliseringsdirektoratet drifter, forvalter og videreutvikler løsningen.

## Hvor finner jeg informasjon om kostnader, statistikk og videre utvikling?

På [Samarbeidsportalen](https://samarbeid.digdir.no/altinn/dataaltinnno/1929), Digdirs felles nettsted for fellesløsningene. Der finner du en kort presentasjon av data.altinn.no, kostnader og vilkår, bruksstatistikk, utviklingsplan og driftsmeldinger. Denne dokumentasjonen dekker den tekniske siden.

## Kan min virksomhet tilby data gjennom data.altinn.no?

Ja, det er nettopp det løsningen er laget for. Datakilder trenger ikke selv å bygge autorisasjon, samtykkehåndtering eller distribusjon til mange konsumenter; det håndteres av data.altinn.no. Kilder med trege eller asynkrone API-er støttes også. Se [Ta i bruk på Samarbeidsportalen](https://samarbeid.digdir.no/altinn/dataaltinnno/1929), eller ta kontakt på [dan@altinn.no](mailto:dan@altinn.no) for å diskutere en ny datakilde eller tjeneste.

## Må jeg ha virksomhetssertifikat for å bruke Maskinporten?

Nei. En Maskinporten-integrasjon kan bruke et eget asymmetrisk nøkkelpar som du lager selv; virksomhetssertifikat er ett alternativ, ikke et krav. For testmiljøet holder rettigheten «Selvbetjening for testing» i Altinn. Scopet for tjenesten du skal bruke tildeler vi, i test og produksjon hver for seg. Stegene står i [Slik får du Maskinporten-tilgang](/api/#slik-får-du-maskinporten-tilgang).

## Hvordan tar jeg kontakt?

Raskest er Slack: bli med i [Digdirs Slack for samarbeidspartnere](https://join.slack.com/t/digdir-samarbeid/shared_invite/zt-2yp202pnk-PXnfUDQICM3PFDPXfehGiQ) og still spørsmålet i kanalen **#produkt-data-altinn-no**. Der finnes det en kanal for hvert produkt Digdir leverer, og invitasjonslenken utløper ikke. Du kan også sende e-post til [dan@altinn.no](mailto:dan@altinn.no). Gjelder det en feil eller et forslag til denne dokumentasjonen, kan du også [opprette en sak på GitHub](https://github.com/data-altinn-no/docs/issues) eller endre sidene direkte; se [hvordan bidra](https://github.com/data-altinn-no/docs/blob/master/CONTRIBUTING.md).

## Hvor finner jeg …?

* **Oversikt over alle datasett**, med felter, parametere og tilgangskrav: [Datasett/datakilder](/datasett/)
* **Registrering, API-nøkkel og Maskinporten-tilgang**: [Kom i gang med API](/api/) og [Slik får du Maskinporten-tilgang](/api/#slik-får-du-maskinporten-tilgang)
* **Direktehøsting og autorisasjonsforespørsel**: [Hvordan innhente opplysninger](/api/#hvordan-innhente-opplysninger)
* **Konvolutt og filtrering med JMESPath**: [Konvolutt og filtrering](/api/#konvolutt-og-filtreringtransformering)
* **Feil- og statuskoder og versjonering**: [Kom i gang med API](/api/#versjonering)
* **Testmiljø og testdata**: [Testing mot data.altinn.no](/testing/)
* **Samtykke og rollekrav i Altinn**: [Samtykke og fullmakt](/samtykkeprosessen/) og [Rollekrav i Altinn](/rollekrav-i-altinn/)
* **SDK for .NET og bruk fra Altinn Studio**: [DAN SDK](https://github.com/data-altinn-no/altinn-apiclient-dan) og [Altinn Studio-apper](/altinnstudio/)
* **Teknisk API-dokumentasjon**: [utviklerportalen](https://data.altinn.no/) og [OpenAPI-spesifikasjonen](/api/oas/)
* **Kostnader, statistikk, utviklingsplan og driftsmeldinger**: [data.altinn.no på Samarbeidsportalen](https://samarbeid.digdir.no/altinn/dataaltinnno/1929)
