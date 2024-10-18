---
title: Meldingtilannenmyndighet
description: Datamodell og schema
weight: 100
---


{{% notice note %}}
Under arbeid!
{{% /notice %}}

### Eksempel
```json
{
  "identifikator": "123",
  "meldingFraMyndighet": "1111111111",
  "meldingOmTildaenhet": "2222222222",
  "datoForMeldingTilAnnenMyndighet": "2024-10-18T08:06:33.1494051Z",
  "meldingsinnholdTilAnnenMyndighet": {
      "meldingsType": "varsel-om-rapport",
      "relatertDatasettOppslagsUrl": "https://api.data.altinn.no/v1/directharvest/TildaTilsynsrapportv1?subject=2222222222&tilsynskilder=1111111111&identifikator=123&envelope=False",
      "fritekst": "Hello World"
  }
}
```

### Schema
```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "AlertMessage",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "identifikator": {
      "type": [
        "null",
        "string"
      ]
    },
    "meldingFraMyndighet": {
      "type": [
        "null",
        "string"
      ]
    },
    "meldingOmTildaenhet": {
      "type": [
        "null",
        "string"
      ]
    },
    "datoForMeldingTilAnnenMyndighet": {
      "type": "string",
      "format": "date-time"
    },
    "meldingsinnholdTilAnnenMyndighet": {
      "oneOf": [
        {
          "type": "null"
        },
        {
          "$ref": "#/definitions/AlertMessageContent"
        }
      ]
    }
  },
  "definitions": {
    "AlertMessageContent": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "meldingsType": {
          "type": [
            "null",
            "string"
          ]
        },
        "relatertDatasettOppslagsUrl": {
          "type": [
            "null",
            "string"
          ]
        },
        "fritekst": {
          "type": [
            "null",
            "string"
          ]
        }
      }
    }
  }
}
```

### OAS
{{% notice note %}}
Under arbeid!
{{% /notice %}}