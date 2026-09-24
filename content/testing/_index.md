---
title: Testing mot data.altinn.no
linktitle: Testing
toc: true
weight: 20
---

## Testmiljø

data.altinn.no har et testmiljø som kan brukes i forbindelse med testing av implementasjoner. Alle endringer som skal i produksjon blir først deployet til testmiljøet før de produksjonssettes.

Testmiljøet er helt separert fra produksjon, og benytter sin egen utvikler-portal, hvor det kreves egne brukere og API-nøkler (subscription keys) som benyttes mot egne endepunkter.

Miljøet benytter Maskinportens testmiljø for autentisering og [Altinn TT02](https://tt02.altinn.no) for autorisasjon og samtykkeforespørsler. 

* [Gå til data.altinn.no Test API Portal](https://test.data.altinn.no/)
* [OpenAPI 3.0 (swagger) for v1 Test](https://test-api.data.altinn.no/v1/public/metadata/oas/json)

### REST-API

For REST-API-et benyttes et eget endepunkt, og autentisering skjer med token fra Maskinportens testmiljø.

* [Teknisk beskrivelse av test-API-et](https://test.data.altinn.no/apis)
* [Les mer om bruk av REST-API-et](/api/)

## Test-organisasjoner for forespørsler

data.altinn.no støtter bruk av Tenor-testdata for de fleste datasettene. Noen andre tjenester og datasett benytter andre testdata, som er nærmere beskrevet i onboarding-dokumentasjonen til den aktuelle tjenesteeieren. Altinn TT02 og Maskinportens testmiljø støtter også bruk av Tenor.

* [Les mer om Tenor hos Skatteetaten](https://www.skatteetaten.no/skjema/testdata/)
* [Tenor testdatasøk (krever innlogging med ID-porten)](https://testdata.skatteetaten.no/web/testnorge/)

## Tilgjengelige datasett i testmiljøet

Listen over tilgjengelige datasett i testmiljøet er tilgjengelig i det åpne metadata-API-et. Dette API-et benyttes også av den [autogenererte dokumentasjonen](/datasett/). Husk å sette kryss i boksen "Vis testmiljø".

* [Vis liste over alle datasett](/datasett/)
* [Vis liste over datasett i testmiljøet (JSON)](https://test-api.data.altinn.no/v1/public/metadata/evidencecodes)

