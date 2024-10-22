# Real estate care opdracht

## Proces

In hoofdlijnen zijn de volgende stappen gevolgd bij het implementeren van de eindopdracht.

1. Het implementeren van een (niet-werkend) dashboard, in de huisstijl van de case.
2. Het opzetten van een simpele JSON waarin de mock data zit.
3. Het maken van een lijst weergave van de inspecties, obv de test data in de JSON.
4. Het maken van een eerste opzet van de router, gebruikmakend van `react-router-dom`, en daarmee een pagina waar alle inspecties ingezien konden worden.
5. Data modellen maken via JavaScript classes.
6. De test JSON op MyJSONServer zetten, via React hooks (`useState` en `useEffect`) de data ophalen, in state zetten en deze weergeven op het scherm.
7. Services maken voor het ophalen van de data via de Fetch API.
8. Het introduceren van de Login pagina, authenticatie via `localStorage`, en de `PrivateRoute` component om routes af te schermen.
9. Het introduceren van extra paginas volgens de opdracht, incl. darkmode.
10. Het omzetten van de services naar `zustand` stores, om global state management te faciliteren. Hierdoor is data al beschikbaar in de applicatie, omdat deze in de store is opgeslagen. Hier ook een optimalisatie toegevoegd zodat inspecties maar eenmalig opgehaald worden (dit geldt niet voor objectives, omdat deze inspectie specifiek zijn).
11. De detail pagina van inspecties uitbreiden met het kunnen updaten en toevoegen van objectives, ook in de stores.

Over het algemeen was dit een goedlopend proces. De grootste uitdaging lag hem in het feit dat React anders werkt dan bijv. Vue. Vue heeft concepten als models en services/collections ingebouwd. Maar deze zijn niet bestaand in React. Het was dus zoeken wat er nodig was in React om aan dit stuk van de opdracht te voldoen. Met name het omzetten van services naar stores (m.b.v. `zustand`) was het grootste uitzoek werk.

Een ander punt was het gebruik van Mui als design system/component library. Ik ben doorgaans gewend grotendeels mijn eigen HTML + CSS te schrijven. Het moeten gebruiken van een component library zoals Mui, was een proces van wennen. Het zoeken in de documentatie, en hoe bepaalde ideeen terugkomen (of niet terug komen) in de components van Mui was een uitdaging.

## Structuur

De uiteindelijke structuur is in lijn met wat er in de briefing is opgesteld. De volgende structuur is gehanteerd.

- **components**: hierin zitten de generieke components, die herbruikbaarheid, of onderhoudbaarheid zorgen.
- **models**: hierin zitten de data model van inspecties en objectives.
- **pages**: deze corresponderen met de directe "routes" die via de router beschikbaar worden gesteld.
- **stores**: deze bevatten alle logica en binden het aan React, via de package Zustand.

Ten opzichten van de laatste Feedback opdracht is de structuur lichtelijk veranderd. Voorheen maakte ik gebruik van "services". Deze zijn vervangen door "stores". Qua inhoud bevatte beide alle logica. De gebouwde stores linken echter de "service" logica die er voorheen was direct aan Zustand (global state management). Dit "bindt" logica direct aan de rendering van React.

## Functionaliteiten

De volgende functionaliteiten zijn beschikbaar in de demo van de app.

#### Authenticatie
Het is mogelijk voor een gebruiker om in te loggen. Dit is wel "gemockt". Dat houdt in dat je elk willekeurig emailadres en wachtwoord kan invullen om in te loggen. Ook zit er een mock van 2 factor authenticatie in. Na het inloggen met een emailadres en wachtwoord moet er een code ingevoerd worden. Elk willekeurige code voldoet. Voor de implementatie wordt gebruik gemaakt van o.a. `localStorage`. Hierin worden de ingevoerde gegevens opgeslagen.

Alle "routes" zijn ook afgeschermd. Wanneer je een route direct bezoekt waar je niet mag komen (omdat je niet ingelogd bent) wordt je naar de login pagina gestuurd. De implementie hiervan zit in `components/PrivateRoute.jsx`.

#### Dashboard
Het dashboard is geimplementeerd volgens de case in de aangegeven huisstijl. Dit is de pagina waar je op terecht komt na het inloggen. Vanuit deze pagina zijn er 4 andere paginas te bezoeken. Namelijk de vier grote velden die je op het dashboard ziet.

#### Settings
Er zijn een paar settings beschikbaar in de demo app. De meeste settings werken echter niet, en zijn voor sier. Een paar kleine dingen werken wel:

- Je ziet op dit scherm terug het emailadres wat je hebt gebruikt om in te loggen.
- Je kan hier uitloggen. Hiermee wordt de `localStorage` leeggemaakt en kun je afgeschermde routes niet meer bezoeken.
- Je kan dark mode aanzetten. Dit zorgt voor een simpele donkere weergave door de gehele app.

#### Knowledge base
Dit is een pagina met een simpele lijst van links naar andere paginas toe. Dit zijn allemaal mock links die niet corresponderen met de de tekst van de link.

#### Inspecties
Via het dashboard zijn er 2 overzichten aan inspecties beschikbaar: geplande inspecties en afgeronde inspecties. In beide gevallen wordt er een correct gefilterde lijst aan inspecties opgehaald vanuit MyJSONServer. De resultaten worden in de "InspectionStore" opgeslagen (zie `stores/useInspectionStore`). Hierdoor zijn alle inspecties beschikbaar zonder nog een keer data van MyJSONServer te halen.

De lijst van gefilderde inspecties worden als klikbare kaarten op het scherm getoond.

#### Inspectie details
Bij het klikken op een inspectie kaart, opent een pagina met inspectie details. De meeste functionaliteiten zitten in deze pagina verwerkt. De details van de inspectie zelf worden via `store/useInspectionStore` opgehaald. Want daar zijn ze al opgeslagen. Wel worden de inspectie objectives behorende bij deze inspectie opgehaald op MyJSONServer, en opgeslagen in de ObjectiveStore `store/useObjectiveStore`.

Elke objective is klikbaar. Hiermee komt er een dialog waarmee de details van de objective aangepast kunnen worden. Wanneer dit gebeurd worden de nieuwe waardes van de objective naar MyJSONServer gestuurd, en wordt de bijbehorende objective in de ObjectiveStore geupdate. Niet alle informatie is beschikbaar om aan te passen.

Op eenzelfde manier kan je ook een objective aanpakken, alleen als het gaat om een open inspectie. Wanneer je dit doet worden de waardes naar MyJSONServer gestuurd en daarna toegevoegd aan de ObjectiveStore. Hierin is het van belang dat het type objective en de locatie binnen het huis ingevuld worden (verplichte velden). Bij het kiezen van het type objective, zal het formulier zichzelf ook aanpassen om de juiste velden weer te geven.

## Mogelijke verbeteringen

- Werkende authenticatie
- Betere en uitgebreidere validatie op zowel het login scherm, als de create/update formulieren van de objectives.
- Meer settings die daadwerkelijk werken.
- Filtering die werkt bij het ophalen van data van MyJSONServer. Nu moet alles opgehaald worden en door de app gefilterd worden (bijv. op status).
- Fout afhandeling. Als er iets fout gaat in de connectie met MyJSONServer, zal dit er voor zorgen dat de gebruiker vastloopt, omdat deze fouten niet worden afgevangen.

## 10 heuristieken Jacob Nielsen

#### 1. Zichtbaarheid van systeemstatus

Door gebruik te maken de interne state-management capaciteiten van React en het Zustand state management systeem kunnen we laten zien wanneer het systeem aan het laden is. Dit gebeurd specifiek op 3 momenten:

- Wanneer meerdere inspectices van MyJSONServer ophalen, komt er groot "Loading" in het scherm te staan.
- Wanneer we 1 inspectie ophalen, maar ook de bijbehorende objectives, komt er groot "Loading" in het scherm te staan.
- Wanneer we data naar MyJSONServer sturen (updaten van een inspectie-objective, of het aanmaken van een nieuwe inspectie-objective), komt er "loading" in het formulier te staan. Tevens wordt de "submit" knop disabled, zodat de gebruiker het niet nogmaals kan indrukken.

#### 2. Match tussen systeem en de echte wereld

- Wanneer een inspecteur op de details van een inspectie klikt, krijgt hij/zij een overzicht van alle objectives te zien. In plaats van hem/haar te overladen met details, worden de belangrijkste details weergegeven: de status, het type, en niet onbelangrijk, waar binnen de woning. Dit zorgt ervoor dat een inspecteur zich makkelijk kan bewegen in de fysieke wereld, zelf zijn pad door de woning kan kiezen, en snel kan zien wat er nog moet gebeuren.

#### 3. Controle en vrijheid

- Elke popup/dialog heeft duidelijke knop om hem af te sluiten.
- Wanneer je je in de details begeeft van een inspectie, kun je makkelijk terug via de "Back" button.

#### 4: Consistentie en standaarden

- Alles heeft dezelfde opbouw qua structuur.
- Statussen (inspecties, en inspectie-objectives) worden overal uitgelicht, op dezelfde manier weergegeven, en met dezelfde kleur aangemerkt.

#### 5. Fout preventie

- Op de invoervelden zitten restricties zodat "location" en "type" van inspectie-objectives verplicht zijn. Dit om minimale informatie consistentie en compleetheid te waarborgen.

#### 6. Herkenning in plaats van herinnering

- De formulieren voor "inspectie-objectives" zijn dynamisch. Afhankelijk van het type komen de juiste andere velden te voor schijn. Hierdoor wordt de gebruiker niet overladen met onnodige velden.

#### 7. Flexibiliteit en efficiëntie

- De applicatie is gebouwd op efficientie op locatie. Alleen het broodnodige wordt weergegeven, om de tijds-impact van de applicatie te minimaliseren.
- Voor inspecteurs die op donkere locaties komen, is er de mogelijkheid om een darkmode aan te zetten. Dit zorgt er simpel voor dat alles in het donker weer wordt gegeven, waardoor de ogen minder belast worden.

#### 8. Stijlvol en minimalistisch design

- Er wordt gebruik gemaakt van standaard componenten uit een consistent design system (MUI), wat gebouwd is op Material Design van Google. Hierdoor moet het aanspreken van mensen bekend met Android en/of Google producten.

#### 9. Help gebruikers fouten herkennen, opsporen en herstellen

- De enige foutmeldingen in het systeem zijn de "required" fields in een formulier. Hier is de impact minimaal. Het veld krijgt een rode omlijning en in sommige gevallen bijbehorende tekst.

#### 10. Hulp en documentatie

- Er zijn geen extra hulp middelen, informatie bubbels, of documentatie beschikbaar.

## WCAG 2.1

Op de volgende punten is extra aangedacht gelegd, welke al niet zijn besproken in de 10 van Jacob Nielsen:

- Buttons, anchor tags en clickable cards hebben een duidelijke beschrijving gekregen (via `aria-label`), zodat niet visuele gebruikers alsnog kunnen navigeren.
- Kleur contrast is op de belangrijkste punten nagelopen.
- De applicatie is responsive opgebouwd met een gestandaardiseerde layout.
- Het is mogelijk om goed in te zoemen in de applicatie voor gebruikers. Als hij/zij de tekst groter wil hebben, gaat dat zonder dat de applicatie visueel er op achteruit gaat.
- De applicatie is te gebruiken in portrait & landscape mode van mobile.
