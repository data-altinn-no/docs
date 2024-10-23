---
title: Melding til annen myndighet
description: Standardisering av melding til annen myndighet
weight: 100
---
## Implementering
DAN vil med jevne mellomrom gjøre spørringer mot tilsynsmyndigheter som har implementert 'melding til annen myndighet' (MTAM). Det trengs tre endepunkter for å kunne ferdig-implementere MTAM:
- GET endepunkt for å hente liste over meldinger til andre myndigheter
- GET endepunkt for å hente melding til annen myndighet på ID
- POST endepunkt for å kunne levere varsel om melding

## Meldingstyper
I meldingsinnholdet til annen myndighet er det et felt `meldingsType`. Dette skal være én av tre meldingstyper:
- "varsel-om-rapport"
- "varsel-om-koordinering"
- "varsel-om-fritekst"
  
## GET endepunkt for å hente liste over meldinger
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

For å kvittere ut varselet som mottatt returnerer man 200 OK med tom body. Alle responser med httpkode som ikke starter med 2 vil føre til retry.


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

## GET endepunkt for å hente melding på ID
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

## POST endepunkt for å kunne levere varsel om melding
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