---
title: Fra forespørsel til data, steg for steg
linktitle: Steg for steg
description: En gjennomgang av hele flyten for et datasett som krever samtykke, med alle HTTP-kallene som inngår, fra autorisasjonsforespørsel til høsting.
weight: 20
toc: true
---

## Hva denne siden viser

De fleste datasett kan hentes med ett kall ([direktehøsting](#snarvei-direktehøsting)). Datasett som krever samtykke, eller der kilden svarer asynkront, går gjennom en _akkreditering_: du ber om tilgang, får en akkrediterings-ID, venter på at dataene blir tilgjengelige, og høster dem. Denne siden går gjennom den flyten kall for kall, med datasettet **RestanserV2** i tjenesten **eBevis** som eksempel. Det krever samtykke fra virksomheten det spørres om.

Flyten i korte trekk:

1. **Autorisasjonsforespørsel** – `POST /authorization` med hvem som spør, hvem det spørres om og hvilke datasett. Svaret er en akkreditering.
2. **Samtykke** – data.altinn.no sender en samtykkeforespørsel i Altinn. En representant for subjektet svarer der.
3. **Status** – `GET /evidence/{accreditationId}` forteller om hvert datasett er klart til høsting.
4. **Høsting** – `GET /evidence/{accreditationId}/{evidenceCode}` returnerer dataene.

Alle URL-er under er relative til `https://api.data.altinn.no/v1`. I testmiljøet er base-URL-en `https://test-api.data.altinn.no/v1`, se [Testing](/testing/).

## Før du begynner

* En API-nøkkel (subscription key) for produktet eBevis fra [utviklerportalen](https://data.altinn.no/), og en Maskinporten-klient med scopet `altinn:dataaltinnno/ebevis`. Se [Kom i gang med API](/api/).
* Alle kall har de samme to headerne:

```text
Authorization: Bearer {maskinporten-token}
Ocp-apim-subscription-key: {subscription-key}
```

* Slå opp datasettet i [datasettoversikten](/datasett/). For RestanserV2 står det at det ikke kan direktehøstes, at det krever samtykke, og at akkrediteringen kan være gyldig i inntil 90 dager.

## Steg 1: Autorisasjonsforespørsel

Send én forespørsel som dekker alle datasettene du trenger om dette subjektet. `requestor` er organisasjonsnummeret til den som spør (må være den samme som Maskinporten-tokenet er utstedt til), `subject` er virksomheten det spørres om.

```text
POST https://api.data.altinn.no/v1/authorization HTTP/1.1
Authorization: Bearer {maskinporten-token}
Ocp-apim-subscription-key: {subscription-key}
Content-Type: application/json
```

```json
{
  "requestor": "991825827",
  "subject": "998997801",
  "evidenceRequests": [
    {
      "evidenceCodeName": "RestanserV2",
      "requestConsent": true
    }
  ],
  "consentReference": "Anskaffelse 2026/1234",
  "externalReference": "sak-2026-1234",
  "validTo": "2026-12-15T00:00:00Z",
  "languageCode": "no-nb"
}
```

Feltene:

| Felt | Betydning |
|------|-----------|
| `evidenceRequests[].requestConsent` | Må være `true` for hvert datasett som har samtykkekrav, også når du i tillegg oppgir behandlingsgrunnlag (som for utvidet skatteattest). For datasett uten samtykkekrav har feltet ingen virkning. |
| `evidenceRequests[].parameters` | Parametere til datasettet, hvis det har noen (se datasettoversikten). Format: `[{ "evidenceParamName": "...", "value": ... }]`. |
| `evidenceRequests[].legalBasisId` og `legalBasisList` | Bare for datasett som krever oppgitt behandlingsgrunnlag, for eksempel utvidet skatteattest i eBevis. Se [eBevis](/tjenester/ebevis/#bruk-av-utvidet-skatteattest). |
| `consentReference` | Påkrevd når noen av datasettene krever samtykke. Fritekst som vises for den som skal samtykke, typisk saks- eller anskaffelsesreferanse. |
| `externalReference` | Din egen referanse; kommer tilbake i akkrediteringen. |
| `validTo` | Hvor lenge akkrediteringen skal kunne brukes. Kan ikke overstige den korteste maksimale gyldigheten blant datasettene du ber om (90 dager for RestanserV2); en lengre dato avvises med feilkode 1018. Utelates feltet, settes den maksimale gyldigheten automatisk. |
| `languageCode` | Språk på samtykkeforespørselen i Altinn. |

Svaret er `200 OK` med akkrediteringen i svarkroppen. `Location`-headeren peker på statusressursen for akkrediteringen, den samme som du spør i steg 3. Ta vare på `id`; alle senere kall bruker den.

```text
HTTP/1.1 200 OK
Location: https://api.data.altinn.no/v1/evidence/3fa85f64-5717-4562-b3fc-2c963f66afa6
Content-Type: application/json
```

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "requestor": "991825827",
  "subject": "998997801",
  "evidenceCodes": [
    {
      "evidenceCodeName": "RestanserV2",
      "isAsynchronous": false
    }
  ],
  "issued": "2026-09-24T10:15:00+00:00",
  "validTo": "2026-12-15T00:00:00+00:00",
  "consentReference": "Anskaffelse 2026/1234",
  "externalReference": "sak-2026-1234"
}
```

Merk at `isAsynchronous` er `false` for RestanserV2: det er samtykkekravet, ikke asynkron levering fra kilden, som gjør at datasettet må gå gjennom en akkreditering.

Går det galt, forteller feilkoden i svaret hva som var feil: `400` for feil i selve forespørselen, for eksempel ugyldig `requestor` (`1001`), ukjent datasett (`1007`) eller feil i parametere (`1017`); `401` for manglende eller ugyldig token (`1023`, `1024`); `403` med feilkode `1019` når et tilgangskrav for et datasett ikke er oppfylt. Alle slike brudd samles under den ene koden, enten det er manglende Maskinporten-scope, at `requestor` ikke er organisasjonen tokenet er utstedt til, eller at `requestConsent` eller `consentReference` mangler for et datasett med samtykkekrav; meldingen i svaret sier hvilket krav som feilet. Se [feilhåndtering](#feilhåndtering).

## Steg 2: Samtykke i Altinn

Når akkrediteringen er opprettet, sender data.altinn.no en samtykkeforespørsel til subjektet i Altinn. En representant med riktig rolle får melding i Altinn-innboksen og varsel på e-post og SMS, og godtar eller avslår der. Hvordan det ser ut for den som samtykker er vist under [Samtykke og fullmakt](/samtykkeprosessen/); hvilke roller som kreves står under [Rollekrav i Altinn](/rollekrav-i-altinn/).

Du trenger ikke gjøre noe i dette steget, men du kan **sende en purring** hvis svaret drøyer:

```text
POST https://api.data.altinn.no/v1/accreditations/3fa85f64-5717-4562-b3fc-2c963f66afa6/reminders HTTP/1.1
```

`GET` på samme URL viser hvilke purringer som er sendt tidligere. Purringer er begrenset: det går ikke å purre igjen før det er gått sju dager siden forrige vellykkede purring, eller ett døgn etter et mislykket forsøk. Forsøk innenfor sperretiden avvises med `403` og feilkode `1019`.

## Steg 3: Sjekk status

Spør om status for alle datasettene i akkrediteringen:

```text
GET https://api.data.altinn.no/v1/evidence/3fa85f64-5717-4562-b3fc-2c963f66afa6 HTTP/1.1
```

```json
[
  {
    "evidenceCodeName": "RestanserV2",
    "status": {
      "code": 2,
      "description": "Awaiting consent from subject entity representative"
    },
    "validFrom": "2026-09-24T10:15:00+00:00",
    "validTo": "2026-12-15T00:00:00+00:00"
  }
]
```

Statuskodene er faste innenfor API-versjonen. Kode 1–5 er de som er listet i metadata-API-et; 6 og 7 kan du møte for datasett som leveres asynkront fra kilden og for datasett som er tatt ut av drift:

| Kode | Betydning | Hva du gjør |
|------|-----------|-------------|
| 1 | Dataene er klare til høsting | Gå til steg 4 |
| 2 | Venter på samtykke fra subjektet | Vent, eventuelt purr (steg 2) |
| 3 | Samtykke avslått, eller et gitt samtykke er trukket tilbake | Avslutt; dataene kan ikke hentes på denne akkrediteringen |
| 4 | Samtykket er utløpt | Send ny autorisasjonsforespørsel |
| 5 | Venter på data fra kilden | Vent og spør igjen |
| 6 | Status er ukjent fordi datasettet leveres asynkront | Statuskallet spør ikke kilden for slike datasett. Prøv å høste (steg 4): er dataene ikke klare, får du `503` med feilkode `1016` og tidligste tidspunkt for nytt forsøk |
| 7 | Datasettet er ikke lenger tilgjengelig | Det er tatt ut av data.altinn.no; se datasettoversikten for et eventuelt erstatningsdatasett |

Det finnes ingen varsling når status endrer seg; du må spørre. Et samtykke gis av en person som først skal lese meldingen i Altinn, så regn med at det tar timer eller dager, ikke minutter. Ikke spør på hver enkelt akkreditering med korte mellomrom. Hent i stedet alle akkrediteringer som er blitt klare i ett kall, én eller to ganger i døgnet, og bruk `changedafter` til å be om bare det som har endret seg siden sist:

```text
GET https://api.data.altinn.no/v1/accreditations/?onlyavailable=true&changedafter=2026-09-24T00:00:00Z HTTP/1.1
```

Trenger noen svar raskere, er en purring (steg 2) til den som skal samtykke et bedre virkemiddel enn hyppigere spørringer.

## Steg 4: Høst dataene

Når status er 1, hentes datasettet slik:

```text
GET https://api.data.altinn.no/v1/evidence/3fa85f64-5717-4562-b3fc-2c963f66afa6/RestanserV2 HTTP/1.1
```

```json
{
  "evidenceStatus": {
    "evidenceCodeName": "RestanserV2",
    "status": { "code": 1, "description": "The information is available for harvest" },
    "validFrom": "2026-09-24T10:15:00+00:00",
    "validTo": "2026-12-15T00:00:00+00:00"
  },
  "evidenceValues": [
    { "evidenceValueName": "levert", "source": "Skatteetaten", "timestamp": "2026-09-24T11:02:10Z", "value": "2026-09-24T11:02:09Z", "valueType": "dateTime" },
    { "evidenceValueName": "forespurteOrganisasjon", "source": "Skatteetaten", "timestamp": "2026-09-24T11:02:10Z", "value": "998997801", "valueType": "string" },
    { "evidenceValueName": "arbeidsgiveravgiftForfaltOgUbetalt", "source": "Skatteetaten", "timestamp": "2026-09-24T11:02:10Z", "value": "0 NOK", "valueType": "amount" },
    { "evidenceValueName": "merverdiavgiftForfaltOgUbetalt", "source": "Skatteetaten", "timestamp": "2026-09-24T11:02:10Z", "value": "12500 NOK", "valueType": "amount" }
  ]
}
```

Dataene ligger i `evidenceValues`, ett element per felt i datasettet, med feltnavn og type slik de er beskrevet i datasettoversikten. `valueType` beskriver hva verdien betyr, ikke nødvendigvis JSON-typen: RestanserV2 leverer beløpene som tekst med valuta, for eksempel `"12500 NOK"`. Konvolutten rundt kan fjernes med `?envelope=false`, og svaret kan filtreres med et JMESPath-uttrykk i `query`; se [konvolutt og filtrering](/api/#konvolutt-og-filtreringtransformering).

Du kan høste samme datasett flere ganger så lenge akkrediteringen er gyldig og samtykket ikke er trukket. Trekkes samtykket, viser statuskallet kode 3; utløper det, kode 4. I begge tilfeller, og så lenge samtykket fortsatt venter, svarer høsting med `403` og feilkode `1010`.

## Livssyklus og opprydding

* Akkrediteringen gjelder til `validTo`, begrenset av datasettets maksimale gyldighet (90 dager for RestanserV2). Etter det kan du ikke lenger hente data på den.
* Trenger du dataene igjen etter utløp, sender du en ny autorisasjonsforespørsel; det utløser en ny samtykkeforespørsel.
* En akkreditering du er ferdig med kan slettes:

```text
DELETE https://api.data.altinn.no/v1/accreditations/3fa85f64-5717-4562-b3fc-2c963f66afa6 HTTP/1.1
```

## Feilhåndtering

Feil returneres med en feilkode og en beskrivelse i svaret. Kodene endres ikke innenfor en API-versjon, så du kan trygt reagere på dem i kode. De du oftest møter i denne flyten:

| Kode | HTTP-status | Betydning | Typisk årsak |
|------|-------------|-----------|--------------|
| 1001 / 1004 | 400 | Feil med requestor / subject | Identifikatoren lar seg ikke tolke, eller virksomheten finnes ikke i Enhetsregisteret |
| 1002 | 404 | Akkrediteringen finnes ikke | Feil ID, eller den tilhører en annen konsument |
| 1007 | 400 | Datasettet finnes ikke | Skrivefeil i `evidenceCodeName` |
| 1010 | 403 | Høsting uten aktivt samtykke | Samtykket er ikke gitt ennå, er avslått eller trukket, eller er utløpt; se statuskallet |
| 1011 | 400 | Samtykket er utløpt | Returneres ved purring på en akkreditering der samtykket er utløpt; send ny autorisasjonsforespørsel |
| 1013 / 3001 | 503 | Tjenesten eller kilden er utilgjengelig | Midlertidig; prøv igjen senere |
| 1016 | 503 | Dataene er ikke klare ennå | Asynkront datasett som fortsatt venter på kilden; meldingen oppgir tidligste tidspunkt for nytt forsøk |
| 1017 | 400 | Feil i parametere | Manglende påkrevd parameter eller feil type |
| 1018 | 400 | Ugyldig `validTo` | Utenfor datasettets eller tjenestens tillatte gyldighet |
| 1019 | 403 | Et tilgangskrav er ikke oppfylt | Manglende Maskinporten-scope, `requestor` ulik tokenets organisasjon, manglende `requestConsent` eller `consentReference`, eller purring innenfor sperretiden |
| 1023 / 1024 | 401 | Feil med autentisering / token | Manglende eller utløpt token, feil miljø |

Den fullstendige listen finnes i det åpne metadata-API-et: [feilkoder](https://api.data.altinn.no/v1/public/metadata/errorcodes) og [statuskoder](https://api.data.altinn.no/v1/public/metadata/statuscodes). `503` betyr ikke alltid at en kilde er nede, så sjekk feilkoden før du velger strategi: `1016` betyr at et asynkront datasett fortsatt venter, og svaret oppgir når du tidligst bør prøve igjen; `1013` og `3001` betyr at tjenesten eller kilden er midlertidig utilgjengelig.

## Snarvei: direktehøsting

Datasett som ikke krever samtykke og der kilden svarer synkront, trenger ingen akkreditering. Ett kall gir dataene:

```text
GET https://api.data.altinn.no/v1/directharvest/UnitBasicInformation?subject=998997801&envelope=false HTTP/1.1
```

Datasettoversikten viser for hvert datasett om det kan direktehøstes, og gir ferdige eksempler både for HTTP og for [DAN SDK](https://github.com/data-altinn-no/altinn-apiclient-dan), som pakker inn hele flyten på denne siden i noen få metodekall for .NET.
