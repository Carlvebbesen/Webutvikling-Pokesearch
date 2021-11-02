# Poké Search

Applikasjonen gjør det mulig å filtrere og sortere en database av Pokémon.

## Backend

Applikasjonens backend-server er bygd opp av følgende:

* Databasen MongoDB
* Graphql
* Express (skrevet i Typescript)
* Apollo Server

Gruppen valgte å benytte Express for HTTP-server da det er et mye brukt bibliotek for javascript/typescript, og således
finnes det omfattende dokumentasjon og eksempler tilgjengelig. Videre integrerer Apollo server-biblioteket enkelt med
Express, gjennom node-pakken apollo-server-express. Apollo server er tatt i bruk for å sammenkoble http-serveren fra
Express, Graphql, og databasen.

Sortering og filtrering er håndtert i backend-serveren. Ved å kjøre sortering og filtrering som queries via mongoose
pakken, vil arbeidet foregå tett mot databasen, slik at kjøretiden er effektiv. Det vil derimot være flere
http-forespørseler som må sendes mellom frontend og backend. Gruppen så det hensiktsmessig å effektivisere
sorterings-/filtreringsarbeidet fremfor å minnimere http-forespørsler, for å sikre best mulig brukeropplevelse ved høy
responsivitet selv ved søk i store datamengder. Dette har ikke så stor effekt med en såpass liten database, 
men er lurere dersom databasestørrelsen skulle vært større.

Vi valgte å bruke et pokemon-API fordi vi synes det var oversiktlig å bruke, og vi synes dataene var gode å jobbe
med. I tillegg er det et morsomt tema som er lett å visualisere på en god måte. 

## Frontend

### Komponenter

I frontend har vi valgt å bruke en del komponenter fra material-ui. Dette er et bibliotek som har et enkelt og forståelig
design, men mange ulike komponent-typer som gjør fremvisning av data oversiktlig og ryddig. I tillegg har mange av
komponentene funksjonalitet som hadde tatt lang tid å implementere på egenhånd, slik som Table og Accordion.

### Universell utforming

Vi har blant annet sørget for at alt er lettleselig, med tydelig skrifttype, og svart skrift på hvit bakgrunn. Vi har
også markert overskrifter med h-elementer i html-koden. Alle bilder har alt-tag, slik at dersom bildet ikke vises, har
bildet fortsatt en beskrivelse av hva det er. 

### Testing

Vi har valgt å ha hovedfokus på ende-til-ende-testing, fordi vi mener det tester nettsiden på den beste måten. Vi har
også må enhetstester der vi ser på det som nødvendig, i tillegg til at vi ville ha de med for å lære oss å bruke det.

### State management

Vi har i dette prosjektet valgt å bruke recoil for state management. Dette er et bibliotek utviklet av facebook som gir samme funksjonalitet som andre state-manegement-biblioteker som for eksempel redux, bare med en ryddigere løsning, synes vi. Derfor valgte vi å bruke dette.

### Annet

- Grunnen til at ikke dependency-arrayet til useEffecten i overview-page er fylt opp er at dette ikke vil gi ønsket
  funksjonalitet som er debounce kun på søk på navn.
- Det kommer en feilmelding i console når man går inn på database-siden. Dette er en feil som oppstår på grunn av noen
  material-ui-komponenter. Gjennom omfattende testing har vi funnet ut at dette ikke påvirker funksjonaliteten i noen grad. 
