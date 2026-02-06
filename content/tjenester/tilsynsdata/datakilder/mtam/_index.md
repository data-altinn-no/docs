---
title: Melding til annen myndighet
description: Standardisering av melding til annen myndighet
weight: 100
---

- [Hensikt](#hensikt)
  - [Hvordan fungerer det faktisk?](#hvordan-fungerer-det-faktisk)
- [Implementering](#implementering)
  - [Meldingstyper](#meldingstyper)
  - [GET endepunkt for å hente liste over meldinger](#get-endepunkt-for-å-hente-liste-over-meldinger)
  - [GET endepunkt for å hente melding på ID](#get-endepunkt-for-å-hente-melding-på-id)
  - [POST endepunkt for å kunne levere varsel om melding](#post-endepunkt-for-å-kunne-levere-varsel-om-melding)
- [Spørsmål og svar](#spørsmål-og-svar)
  - [Trenger vi å implementere både sending og mottak?](#trenger-vi-å-implementere-både-sending-og-mottak)
  - [Må vi sende meldingene våre til Tilda?](#må-vi-sende-meldingene-våre-til-tilda)
  - [Må vi ha støtte for å levere meldinger etter gitt tidspunkt?](#må-vi-ha-støtte-for-å-levere-meldinger-etter-gitt-tidspunkt)

## Hensikt
Hensikten med 'Melding til annen myndighet'-systemet (MTAM) er å fasilitere automatisk kommunikasjon mellom forskjellige tilsynskilder uten at de må sette opp egne integrasjoner mot hver eneste annen tilsynskilde. Dette gjøres med Tilda som bindeledd, slik at en tilsynskilde bare trenger å sette opp integrasjon for MTAM, og så håndterer Tilda resten av prosesseringen.

![SimpleArchitecture](/images/guides/tilda/tilda-mtam-simple-arch.png "Arktitekturoversikt for MTAM")

### Hvordan fungerer det faktisk?
Hvert femte minutt gjør Tilda en spørring mot alle tilsynskilder som har implementert MTAM for å hente nye meldinger. Se [implementering](#implementering) for hva som skal til for å ha implementert MTAM. Tilda sjekker sin egen liste over når den sist hentet meldinger, og så spør kun om meldinger som har dukket opp etter siste spørring. Hvis den finner meldinger, vil disse plukkes opp og leveres til mottaker.

![SimpleArchitecture](/images/guides/tilda/tilda-mtam-flowchart.png "MTAM flytoversikt")

## Implementering
DAN vil med jevne mellomrom gjøre spørringer mot tilsynsmyndigheter som har implementert MTAM. Det trengs tre endepunkter for å kunne ferdig-implementere MTAM:
- GET endepunkt for å hente liste over meldinger til andre myndigheter
- GET endepunkt for å hente melding til annen myndighet på ID
- POST endepunkt for å kunne levere varsel om melding

### Meldingstyper
I meldingsinnholdet til annen myndighet er det et felt `meldingsType`. Dette skal være én av tre meldingstyper:
- "varsel-om-rapport"
- "varsel-om-koordinering"
- "varsel-fritekst"
  
### GET endepunkt for å hente liste over meldinger
Dette er endepunktet som Tilda kaller for å hente utgående meldinger til andre myndigheter.
Hvis `fromDate` ikke er oppgitt så vil vi hente alle utgående meldinger. 

```
{baseurl}/mtam?fromDate={fromDate}
```    
```
GET
https://api.bestetilsynsmyndighet.no/mtam?fromDate=2024-10-24T12:52:43
```

Response:
```json
[
    {
        "identifikator": "e0095746-56dd-4513-814e-57494ba42d38",
        "datoForMeldingTilAnnenMyndighet": "2024-10-17T12:20:02.0775177Z",
        "mottaker": "111111111",
        "meldingOmTildaenhet": "2222222222",
        "meldingsinnholdTilAnnenMyndighet":
            {
                "meldingsType": "varsel-om-rapport",
                "fritekst": "Hello World"
            }
    }
]
```

OAS:
```yaml
application/json:
  schema:
    type: array
    items:
      type: object
      properties:
        identifikator:
          type: string
        datoForMeldingTilAnnenMyndighet:
          type: string
        mottaker:
          type: string
        meldingOmTildaenhet:
          type: string
        meldingsinnholdTilAnnenMyndighet:
          type: object
          properties:
            meldingsType:
              type: string
            fritekst:
              type: string
```

### GET endepunkt for å hente melding på ID
Dette er endepunktet som andre myndigheter via Tilda kaller på for å hente en spesifikk melding.

```
{baseurl}/mtam/{id}?requestor={requestor_orgnr}
```    
```
GET
https://api.bestetilsynsmyndighet.no/mtam/e0095746-56dd-4513-814e-57494ba42d38?requestor=998997801
```

Respons:
```json
{
    "identifikator": "e0095746-56dd-4513-814e-57494ba42d38",
    "datoForMeldingTilAnnenMyndighet": "2024-10-17T12:20:02.0775177Z",
    "mottaker": "111111111",
    "meldingOmTildaenhet": "2222222222",
    "meldingsinnholdTilAnnenMyndighet":
        {
            "meldingsType": "varsel-om-rapport",
            "fritekst": "Hello World"
        }
}
```
OAS:
```yaml
application/json:
  schema:
    type: object
    properties:
      identifikator:
        type: string
      datoForMeldingTilAnnenMyndighet:
        type: string
      mottaker:
        type: string
      meldingOmTildaenhet:
        type: string
      meldingsinnholdTilAnnenMyndighet:
        type: object
        properties:
          meldingsType:
            type: string
          fritekst:
            type: string
```

### POST endepunkt for å kunne levere varsel om melding
Dette er endepunktet som Tilda leverer meldinger til fra andre myndigheter. `source`-feltet inneholder link til Tilda-endepunkt i data.altinn.no som kan følges for å hente hele meldingen.

```
{baseurl}/mtam 
```
```
POST
https://api.bestetilsynsmyndighet.no/mtam
```

Formatet vil følge [CloudEvent-formatet](https://github.com/cloudevents/spec)  
Request body:
```json
{
    "specversion": "1.0",
    "id": "e0095746-56dd-4513-814e-57494ba42d38",
    "time": "2024-10-17T12:20:02.0775177Z",
    "type": "dan.tilda.meldingfraannenmyndighet.v1",
    "source": "https://api.data.altinn.no/v1/directharvest/TildaMeldingTilAnnenMyndighetv1?subject=1111111111&identifikator=e0095746-56dd-4513-814e-57494ba42d38&envelope=False",
    "subject": "1111111111",
    "resource": "urn:altinn:resource:tilda-melding-til-annen-myndighet"
}
```

For å kvittere ut varselet som mottatt returnerer man 200 OK med tom body. Alle responser med httpkode som ikke starter med 2 vil føre til retry.

OAS:
```yaml
application/json:
  schema:
    type: object
    properties:
      specversion:
        type: string
      id:
        type: string
      time:
        type: string
      type:
        type: string
      source:
        type: string
      subject:
        type: string
      resource:
        type: string
```

## Spørsmål og svar

### Trenger vi å implementere både sending og mottak?
Det må være gyldige endepunkter som Tilda kan kalle, men hvis man bare ønsker å implementere sending kan man f.eks. bare lage et mottaks-endepunkt som bare returnerer 200 OK. Hvordan dere håndterer meldingene dere får fra andre er opp til dere.

### Må vi sende meldingene våre til Tilda?
Nei, Tilda vil kalle på endepunktene når den skal hente meldinger.

### Må vi ha støtte for å levere meldinger etter gitt tidspunkt?
Ja. I tilfelle noe går feil ved utsending så vil ikke Tilda oppdatere når den sist hentet meldinger og vil prøve på nytt igjen med samme tidspunkt som utgangspunkt. Det gjør også at man kan hente meldinger tilbake i tid ved behov.
