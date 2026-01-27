---
title: Advokatregisteret
description: Innhenting av data fra advokatregisteret
weight: 80
---



Digdir er distributør av Advokatregisteret på vegne av Advokattilsynet, hvor Data.altinn.no benyttes som teknisk løsning.  
Tilgang til advokatregisteret må godkjennes av Advokattilsynet (post@tilsynet.no) før vi kan tildele scope i maskinporten. 

## Bruksvilkår
Advokattilsynets register inneholder personopplysninger, blant annet navn og tilknytning til advokatforetak. Du må derfor ta hensyn til personvernregelverket ved bruk av utleverte data fra API-et.

Personopplysningsregelverket gjelder for både private virksomheter og offentlig sektor. Hvis din virksomhet ønsker å behandle opplysninger fra Advokattilsynets register må du selv sørge for at dere har et rettslig grunnlag for å behandle opplysningene. Advokattilsynet vil ikke kreve at dere fremlegger dette for oss ved innhenting av opplysninger fra registeret.

Dere har en selvstendig plikt etter personvernforordningen artikkel 6 til å påse at behandlingen av opplysningene oppfyller ett av vilkårene i artikkel 6 nr. 1 bokstav a til f, for at behandlingen skal være lovlig. Personopplysningsloven artikkel 4 nr. 2 definerer behandling som “enhver bruk av personopplysninger, som f.eks. innsamling, registrering, sammenstilling, lagring og utlevering eller en kombinasjon av slike bruksmåter”.

Når din virksomhet mottar opplysninger fra registret, vil du være behandlingsansvarlig for opplysningene du mottar. Etter ansvarlighetsprinsippet i personvernforordningen artikkel 5(2) er det du som behandlingsansvarlig som er ansvarlig for, og skal kunne påvise, at prinsippene for behandling av personopplysninger overholdes. Du kan lese mer om prinsippene for behandling av personopplysninger på Datatilsynets nettsider.

Brudd på personvernregelverket kan medføre overtredelsesgebyr fra Datatilsynet.
Du må lagre dataene på en forsvarlig måte. Når du er ferdig med å behandle dataene fra uttrekket, må du slette dataene du ikke lenger benytter deg av.

## Datasett

Per i dag er det seks forskjellige oppslag tilgjengelig.  

* Verifikasjon 

Tar inn et fødselsnummer og returnerer om personen er registrert i advokatregisteret eller ikke, samt tittel (advokat, advokatfullmektig)  

* Personoppslag 

Tar inn et fødselsnummer og returnerer samme informasjon som oppslaget beskrevet over, men inkluderer også informasjon om relasjoner til andre personer og virksomheter 

* Bulknedlastning 

En zip-fil med hele alle advokater, advokatfullmektige og praksiser

* Verifikasjon for private aktører

Tar inn et fødselsnummer og returnerer om personen er registrert i advokatregisteret eller ikke, samt tittel (advokat eller advokatfullmektig), men returnerer ikke fødselsnumre  

* Personoppslag for private aktører 

Tar inn et fødselsnummer og returnerer samme informasjon som oppslaget beskrevet over, men inkluderer også informasjon om relasjoner til andre personer og virksomheter uten fødselsnumre

* Bulknedlasting for private aktører 

En zip-fil med hele alle advokater, advokatfullmektige og praksiser uten fødselsnumre

{{% evidencecodes Advokatregisteret %}}
