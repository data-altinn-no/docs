---
title: Altinn Studio-apper
description: Hvordan bruke data.altinn.no fra Altinn Studio-apper
weight: 65
toc: true
---

### Preutfylling ved bruk av data.altinn.no og prefill.json i Altinn Studio

Kommer snart :)

### Dynamisk henting av datasett fra data.altinn.no i app-kode

Den enkleste måten å integrere seg med data.altinn.no fra en Altinn Studio-app er å ta i bruk to nuget-pakker som håndterer kall mot data.altinn.no.
- [Altinn.ApiClients.Dan](https://www.nuget.org/packages/Altinn.ApiClients.Dan) - for requester mot data.altinn.no
- [Altinn.ApiClient.Maskinporten](https://www.nuget.org/packages/Altinn.ApiClients.Maskinporten) - for å hente maskinporten-tokens og knytte dem til dan-klienten

Disse kan knyttes sammen og i stor grad defineres i config, se [eksempel her](https://github.com/data-altinn-no/altinn-apiclient-dan/blob/main/README.md).

Apikey (subscription key) får man fra [test.data.altinn.no](https://test.data.altinn.no/) og [data.altinn.no](https://data.altinn.no/), mens maskinporten-oppsett og definering av klienter gjøres i [samarbeidsportalen](https://samarbeid.digdir.no/).