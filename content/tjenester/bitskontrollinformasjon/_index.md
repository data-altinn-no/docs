---
title: BITS kontrollinformasjon
description: Informasjon om api-endepunkter hos norske finansinstitusjoner
weight: 170
---

Distribusjonsstøttetjeneste for å utlevere finansinstitusjoners api-endepunkter

## Tjenestebeskrivelse
BITS kontrollinformasjon er et ledd i Kontrollinformasjon - en kontrollprosess for å avsløre og forebygge økonomisk kriminalitet. 
For mer informasjon, se [her](https://www.bits.no/project/kontrollinformasjon/)

## Hvem kan bruke informasjonen
BITS kontrollinformasjon-tjenesten er tilgjengelig for Altinns tjenesteeiere som også er deltakere i DSOP Kontrollinformasjon. 

## Hvordan ta tjenesten i bruk
Hente test-endepunkter: 

Lage bruker på test.data.altinn.no og be om tilgang til produktet «BITS kontrollinformasjon». Etter godkjenning vil man få en api-nøkkel som må legges ved når man etterspør endepunktene.
I tillegg må man definere en klient i maskinportens test-miljø som har tilgang på scopet altinn:dataaltinnno/kontrollinformasjon - scopet vil være forhåndstildelt til de aktuelle aktørene både i test og produksjon. Dette er for å sikre bruken at konsumentgruppen er i henhold til nåværende juridiske føringer på bruk av Altinn-løsninger.

For å hente data må man gjøre en spørring mot test-api.data.altinn.no og det aktuelle datasettet «Kontrollinformasjon». 
Beskrivelsen av selve datasettet finnes nederst på denne siden (hak av for vis testmiljø).

```HTTP
GET https://test-api.data.altinn.no/v1/directharvest/Kontrollinformasjon/?envelope=false HTTP/1.1
Authorization: Bearer {maskinporten-token}
Ocp-apim-subscription-key: {subscription-key}
```

Dette vil gi en respons som ser ut som følger (generert, ikke reell):
```JSON
[
    {
        "orgNo": "123456789",
        "name": "NAVN PÅ BANK",
        "url": https://api.navn.no/dsopaccountcontrolinfo/v2/AccountControlInfoService/v2/837884942,
        "version": "v2",
        "env" : "test"
    },
    {

        "orgNo": "987654321",
        "name": "NAVN PÅ ANNEN BANK",
        "url": https://api.annenbank.no/dsopaccountcontrolinfo/v1/AccountControlInfoService/v2/920426530,
        "version": "v1",
        "env" : "test"
    }    
]
```
 

### Hente prod-endepunkter:

Lage bruker på data.altinn.no og be om tilgang til produktet «BITS kontrollinformasjon». Etter godkjenning vil man få en api-nøkkel som må legges ved når man etterspør endepunktene.
I tillegg må man definere en klient i maskinportens produksjonsmiljø som har tilgang på scopet altinn:dataaltinnno/kontrollinformasjon - scopet vil være forhåndstildelt til de aktuelle aktørene. Dette er for å sikre bruken at konsumentgruppen er i henhold til nåværende juridiske føringer på bruk av Altinn-løsninger.

For å hente data må man gjøre en spørring mot test-api.data.altinn.no og det aktuelle datasettet «Kontrollinformasjon».  Beskrivelsen av selve datasettet finnes nederst på denne siden.

```HTTP
GET https://api.data.altinn.no/v1/directharvest/Kontrollinformasjon/?envelope=false HTTP/1.1
Authorization: Bearer {maskinporten-token}
Ocp-apim-subscription-key: {subscription-key}
```

Dette vil gi en respons som ser ut som følger (generert, ikke reell):
```JSON
[
    {
        "orgNo": "123456789",
        "name": "NAVN PÅ BANK",
        "url": https://api.navn.no/dsopaccountcontrolinfo/v2/AccountControlInfoService/v2/837884942,
        "version": "v2",
        "env" : "prod"
    },
    {

        "orgNo": "987654321",
        "name": "NAVN PÅ ANNEN BANK",
        "url": https://api.annenbank.no/dsopaccountcontrolinfo/v1/AccountControlInfoService/v2/920426530,
        "version": "v1",
        "env" : "prod"
    }    
]
```

## Varsling om nedetid og planlagte endringer
Data.altinn.no vil sende ut varsel til konsumenter ved planlagt nedetid, endringer som påvirker tjenesten osv.

Konsumenter vil varsles via [BITS varslingsrutine](https://dokumentasjon.dsop.no/dsop_v2fellesstandard_operational_processes.html) og motta informasjon om følgende:

- Identifikator på varselet (issue på github)
- Data.altinn.no/bits kontrollinformasjon 
- Om varselet gjelder endring/nedetid/annet
- Hvilket miljø det gjelder
- Beskrivelse 
- Start- og slutt-tidspunkt
- Status

## Datasett som inngår i tjenesten
{{% evidencecodes "Bits kontrollinformasjon" %}}
