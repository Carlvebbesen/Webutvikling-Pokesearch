# Poké Search
Applikasjonen gjør det mulig å filtrere og sortere en database av Pokémon. 

## Backend
Applikasjonens backend-server er bygd opp av følgende:
* Databasen MongoDB
* Graphql
* Express (skrevet i Typescript)
* Apollo Server

Gruppen valgte å benytte Express for HTTP-server da det er et mye brukt bibliotek for javascript/typescript, og således finnes det omfattende dokumentasjon og eksempler tilgjengelig. Videre integrerer Apollo server-biblioteket enkelt med Express, gjennom node-pakken apollo-server-express. Apollo server er tatt i bruk for å sammenkoble http-serveren fra Express, Graphql, og databasen. 

Sortering og filtrering er håndtert i backend-serveren. Ved å kjøre sortering og filtrering som queries via mongoose pakken, vil arbeidet foregå tett mot databasen, slik at kjøretiden er effektiv. Det vil derimot være flere http-forespørseler som må sendes mellom frontend og backend. Gruppen så det hensiktsmessig å effektivisere sorterings-/filtreringsarbeidet fremfor å minnimere http-forespørsler, for å sikre best mulig brukeropplevelse ved høy responsivitet selv ved søk i store datamengder.
