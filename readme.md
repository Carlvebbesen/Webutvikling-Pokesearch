# Poké Search

Applikasjonen gjør det mulig å filtrere og sortere en database av Pokémon, samt opprette lag med opptil seks Pokémon. Disse lagene lagres persistent på navn. I tillegg finnes det funksjonalitet for å gi vurdering av pokemonene. 

## Lokal kjøring:

**Start lokal backend i backend/-mappen:**

```yarn start```

**Start lokal frontend i frontend/-mappen:**

```yarn start```

**NB**: Lokal frontend benytter backend hostet på NTNU vm, for at koblingen skal fungere må prosjektet kjøres på NTNU-nettet eller gjennom vpn. For å kjøre frontend med lokal backend må følgende linje i frontend/src/index.tsx:

```uri: 'http://it2810-11.idi.ntnu.no:8080/graphql'```

byttes ut med:

```uri: 'http://localhost:8080/graphql'```


## Backend

Applikasjonens backend-server er bygd opp av følgende:

* Databasen MongoDB
* Graphql
* Express (skrevet i Typescript)
* Apollo Server

Gruppen valgte å benytte Express for HTTP-server da det er et mye brukt bibliotek for javascript/typescript, og således
finnes det omfattende dokumentasjon og eksempler tilgjengelig. Videre integrerer Apollo server-biblioteket enkelt med Express, gjennom node-pakken apollo-server-express. Apollo server er tatt i bruk for å sammenkoble http-serveren fra Express, Graphql, og databasen.

Sortering og filtrering er håndtert i backend-serveren. Ved å kjøre sortering og filtrering som queries via mongoose pakken, vil arbeidet foregå tett mot databasen, slik at kjøretiden er effektiv. Det vil derimot være flere http-forespørseler som må sendes mellom frontend og backend. Gruppen så det hensiktsmessig å effektivisere sorterings-/filtreringsarbeidet fremfor å minnimere http-forespørsler, for å sikre best mulig brukeropplevelse ved høy
responsivitet selv ved søk i store datamengder. Dette har ikke så stor effekt med en såpass liten database, men er det beste valget dersom databasestørrelsen skulle vært større.

Vi valgte å bruke et pokemon-API fordi vi synes det var oversiktlig å bruke, og vi synes dataene var gode å jobbe med. I tillegg er det et morsomt tema som er lett å visualisere på en god måte. 

## Frontend

### **Komponenter**

I frontend har vi valgt å bruke en del komponenter fra material-ui. Dette er et bibliotek som har et enkelt og forståelig design, men mange ulike komponent-typer som gjør fremvisning av data oversiktlig og ryddig. I tillegg har mange av komponentene funksjonalitet som hadde tatt lang tid å implementere på egenhånd, slik som Table og Accordion. 


### **Universell utforming**
Appen er designet for å følge prinsippene bak universell utforming. Vi har blant annet sørget for at alt er lettleselig, med tydelig skrifttype, og svart skrift på hvit bakgrunn. Vi har
også markert overskrifter med h-elementer i html-koden. Alle bilder har alt-tag, slik at dersom bildet ikke vises, har bildet fortsatt en beskrivelse av hva det er. 

### **Testing**

Vi har valgt å ha hovedfokus på ende-til-ende-testing, fordi vi mener det tester nettsiden på den beste måten. Vi har også må enhetstester der vi ser på det som nødvendig, i tillegg til at vi ville ha de med for å lære oss å bruke det. 

#### **Ende-til-ende testing**

Biblioteket cypress er benyttet for integrasjonstester som tar i bruk hele applikasjonen (frontend, backend, og database). Hensikten med disse testene er å etterligne en brukers interaksjon med systemet og verifisere at interaksjoner gir forventet respons fra brukerens perspektiv.
Gruppen har valgt å skrive ende-til-ende tester ved hjelp av Cypress, siden biblioteket gir støtte for oppsett, skriving, kjøring, og feilsøking av tester uten behov for tredjeparts biblioteker. Videre er cypress open-source og kildekoden er tilgjengelig på github, som gjør det enkelt å sette seg inn i hvordan det fungerer. I tillegg finnes det omfattende og oversiktlig dokumentasjon på hvordan biblioteket skal brukes.

Kommando for å kjøre cypress-tester (fra tests/cypress/-mappen)

```yarn test```

Kommando for å kjøre testene i cypress GUI

```yarn test open```

#### **Backend-tester av resolvers**

Logikken til graphql-apiet er skrevet i resolvers.ts. Her tas input fra klienten inn, og gjennom databaseoperasjoner og business logic produseres en respons som sendes tilbake til klienten. Logikken for resolvers er testet med bruk av jest og en designert test-database, som kjøres lokalt på pcen til den som kjører testene. Etter hver test av en query- eller mutation-metode slettes innholdet i databasen og initiell data innsettes, slik at database operasjoner fra ulike tester ikke påvirker hverandre.

Kommando for å kjøre backend jest tester (fra backend/-mappen)

```yarn test```

#### **Frontend-tester**
Vi har testet hele frontenden ved hjelp av jest. Testingen er utført for å sjekke frontendens oppførsel. Vi har brukt en Apollos MockProvider for å simulere svarene på kallene til backend. Svarene på kallene finner man i testData.ts. Vi har også testet at state managementet fungerer slik som ønsket. Dette er gjort ved å lage en RecoilObserver (øverst i PopUp.test.tsx). Etter tidligere tilbakemelding har vi også valgt å kommentere testene (selv om det blir noe rotete). Dette er gjort for å gjøre handlingene så lett å forstå som mulig. 

Vi har også brukt snapshot-tester for å teste at nettsiden lastes riktig. Grunnen til at ikke alt er testet med snapshot-tester er at Material UI autogenererer nye IDer på komponentene. Vi anser ikke dette som et problem, ettersom vi har annen omfattende testing av appen. 

### **State management**

Vi har i dette prosjektet valgt å bruke recoil for state management. Dette er et bibliotek utviklet av facebook som gir samme funksjonalitet som andre state-management-biblioteker som for eksempel redux, bare med en ryddigere løsning. Derfor valgte vi å bruke dette.

### **Annet**

- Grunnen til at ikke dependency-arrayet til useEffecten i overview-page er fylt opp er at dette ikke vil gi ønsket funksjonalitet som er debounce kun på søk på navn.
- Det kommer en feilmelding i console når man går inn på database-siden. Refererer til at en <td> ikke kan være inne i en <div>.  Dette er en feil som oppstår på grunn av noen material-ui-komponenter. Gjennom omfattende testing har vi funnet ut at dette ikke påvirker funksjonaliteten i noen grad.

- Vi har opplevd at en av gruppemedlemmene sliter med å få kjørt alle testene, men de varierer hvilke tester som ikke kjører for personen. Vi har forsøkt å feilsøke, men finner ingen åpenbare feil ved prosjektets tester. Vedlagt finner du et bilde som viser at alle testene fungerer og kjører slik de skal. Om du evt får et problem med tester som ikke kjører, prøv hvertfall å kjør dem en gang til :D

**Komponenttestene:**

![Unit Tests](/images/Screenshot_2021-11-20_at_15.37.15.png?raw=true "Unit tests")

**Cypress-testene:**

![Cypress](/images/Screenshot_2021-11-20_at_16.10.58.png?raw=true "Cypress")

