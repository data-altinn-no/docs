---
title: Altinn Studio-apper
description: Hvordan bruke data.altinn.no fra Altinn Studio-apper
weight: 65
toc: true
---

### Preutfylling ved bruk av data.altinn.no og prefill.json i Altinn Studio
Du kan forhåndsutfylle skjemaer i Altinn Studio ved å bruke data fra data.altinn.no.
Alt du trenger er en model.prefill.json-fil og en model.cs-fil. Påse at at prefill og model-filen har matchende navn. Eksempel: `person.prefill.json` og `person.cs`.

Du kan bruke hvilket som helst dataset fra data.altinn.no. For en oversikt over alle datasetene kan du gå hit: https://docs.data.altinn.no/datasett/. 

I `person.prefill.json` fyller du ut hvilket dataset du skal bruke og hvilke felt du skal fylle. I eksempelet under bruker vi datasettet `UnitBasicInformation` og mapper feltene `BusinessAddressStreet` og `OrganizationNumber` som kommer fra endepunktet til `Email` og `OrganizationNumber` i skjemaet.
```
{  
  "DAN": {
    "datasets": [
      {
        "name": "UnitBasicInformation",
        "mappings": [
          { "BusinessAddressStreet": "Email" },
          { "OrganizationNumber": "OrganizationNumber" }
        ]
      }
    ]
  }
}
```

```
[XmlRoot(ElementName="person")]
public class person
{
    [RegularExpression(@"^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$")]
    [XmlElement("datoFelt", Order = 1)]
    [JsonProperty("datoFelt")]
    [JsonPropertyName("datoFelt")]
    public string DatoFelt { get; set; }

    [XmlElement("epostFelt", Order = 2)]
    [JsonProperty("epostFelt")]
    [JsonPropertyName("epostFelt")]
    public string Email { get; set; }

    [XmlElement("organisasjonsnrFelt", Order = 3)]
    [JsonProperty("organisasjonsnrFelt")]
    [JsonPropertyName("organisasjonsnrFelt")]
    public string OrganizationNumber { get; set; }
}
```

Hvis du vil bruke flere datasett, kan du legge til flere objekter i `datasets`-arrayet.
```
{  
  "DAN": {
    "datasets": [
      {
        "name": "UnitBasicInformation",
        "mappings": [
          { "BusinessAddressStreet": "Email" },
          { "OrganizationNumber": "OrganizationNumber" }
        ]
      },
      {
        "name": "Skipsregistrene",
        "mappings": [
          { "feltFraEndepunkt": "FeltFraSkjema" }
        ]
      }
    ]
  }
}
```


For en grundig guide til forhåndsutfylling kan du følge denne linken: https://docs.altinn.studio/nb/altinn-studio/v8/guides/development/prefill/config/.

### Dynamisk henting av datasett fra data.altinn.no i app-kode

Den enkleste måten å integrere seg med data.altinn.no fra en Altinn Studio-app er å ta i bruk to nuget-pakker som håndterer kall mot data.altinn.no.
- [Altinn.ApiClients.Dan](https://www.nuget.org/packages/Altinn.ApiClients.Dan) - for requester mot data.altinn.no
- [Altinn.ApiClient.Maskinporten](https://www.nuget.org/packages/Altinn.ApiClients.Maskinporten) - for å hente maskinporten-tokens og knytte dem til dan-klienten

Disse kan knyttes sammen og i stor grad defineres i config, se [eksempel her](https://github.com/data-altinn-no/altinn-apiclient-dan/blob/main/README.md).

Apikey (subscription key) får man fra [test.data.altinn.no](https://test.data.altinn.no/) og [data.altinn.no](https://data.altinn.no/), mens maskinporten-oppsett og definering av klienter gjøres i [samarbeidsportalen](https://samarbeid.digdir.no/).