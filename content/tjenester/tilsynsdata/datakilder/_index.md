---
title: Dataprodusent-api
description: Standardisering av bakenforliggende API-er
weight: 100
---


{{% notice note %}}
Under arbeid!
{{% /notice %}}


### Generelt
Siden det potensielt er ganske mange bakenforliggende datakilder må alle produsent-api-ene følge oppsett og struktur som angitt i prosjektdokumentasjonen.

### API


#### Definerte datasettnavn:
* tilsyn  - TildaTilsynsrapport og TildaTilsynsrapportAlle
* trend  - TildaTrendrapport og og TildaTrendrapportAlle
* koordinering - TildaTilsynskoordinering og TildaTilsynskoordineringAlle
* npdid - TildaNPDID
* mtam - TildaMeldingTilAnnenMyndighet

Responsformatene for feks TildaTilsynsrapport og TildaTilsynsrapportAlle er i praksis de samme, men "Alle" returnerer mange innslag fra én tilsynsmyndighet i stedet for mange.

Kallene som går ut fra data.altinn.no vil bygges opp vha følgende mal: 
```
{baseurl}/{datasettnavn}/{organisasjonsnummer}?{parametre}
```

Kallene som går ut fra data.altinn.no for å hente samtlige innslag i ett datasett fra ett spesifikt tilsyn (-Alle):
```
{baseurl}/{datasettnavn}?{parametre}
```

#### Definerte parametre:
* requestor - fast parameter med organisasjonsnummer til spørrende tilsynsmyndighet
* fromDate - filtrere med startdato, valgfri
* toDate - filtrere med sluttdato, valgfri
* npdid - filtrere på npdid, valgfri
* filter - filtrering på type tilsyn eller tilsynsobjekt (bare for "Alle"-datasettene)

Eksempel:

```
GET
https://api.bestetilsynsmyndighet.no/trend/911951657/?requestor=998997801&fromDate=2021-01-20T00:00:00.000Z&toDate=2021-01-20T00:00:00.000Z&npdid=3432&filter=kommunalt
```

### Melding til annen myndighet
For å kunne motta meldinger fra annen myndighet må man kunne motta POST-requests på {baseurl}/mtam  
Formatet vil følge [CloudEvent-formatet](https://github.com/cloudevents/spec)  
Eksempel:  
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

### Maskinporten
Alle bakenforliggende API-er skal kreve scopet brreg:tilda for tilgang i tillegg til standard validering.

### Feilkoder
For mer informasjon om feilkodene i data.altinn.no, se [her.](/bruke-rest-api/#feil--og-statuskoder)

### Nedetid
Varsling om lengre nedetid gjøres til forvaltningsansvarlig.

