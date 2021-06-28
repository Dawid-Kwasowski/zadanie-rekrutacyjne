# Zadanie rekrutacyjne
### Zadanie rekrutacyjne na stanowisko Junior Frontend Developer - Vue w firmie DSM Intelligence Sp. z o.o.

W ramach zadania rekrutacyjnego, prosimy zaprojektować oraz stworzyć warstwę graficzną podstrony **/#/zespoly** na podstawie istniejącego szablonu. Prosimy wzorować się na szkicach, które znajdują się w folderze [src/assets/szablony](src/assets/szablony). Każda z sekcji powinna mieć następujące funkcjonalności:

1. Zespoły
	* Możliwość dodawania zespołów oraz odpowiadających im podzespołów.
	* Możliwość edycji nazwy zespołu oraz zdjęcia profilowego zespołu.
	* Możliwość usunięcia zespołu.
2. Zadania
	* Możliwość dodawania zadań oraz przypisywania ich do konkretnych użytkowników oraz ustalenia terminu ich wykonania.
	* Możliwosć edytowania zadań oraz ich usuwania.
	* Możliwość ustawienia statusu zadania - "do wykonania" lub „wykonane".
3. Konwersacje
	* Możliwość prowadzenia konwersacji z wybranym użytkownikiem.
	* Sekcja ta powinna zawierać klikalną listę użytkowników, do których można napisać na czacie.
	* Możliwość wysyłania multimediów, takich jak filmy, zdjęcia lub inne pliki.
4. Pliki
	* Sekcja powinna zawierać współdzieloną przestrzeń dyskową zespołu oraz wizualnie odpowiadać podstronie **/#/dysk**.

W ramach zadania rekrutacyjnego prosimy jedynie zaprojektować wygląd podstrony oraz zaimplementować podstawowe funkcjonalności wizualne. Nie wymagamy jakiejkolwiek integracji z serwerami backendowymi.

### Wykorzystywane technologie

Projekt wykorzystuje framework **Vue.js** oraz bazuje na komponentach biblioteki **Vuetify**. Linki do dokumentacji poniżej:

1. [Vue](https://vuejs.org/)
2. [Vuex](https://vuex.vuejs.org/)
3. [Vue router](https://router.vuejs.org/)
4. [Vuetify](https://vuetifyjs.com/en/)

### Rozwiązania

Co do rozwiązań, to zostawiamy Państwu dowolność. Mogą Państwo udostępnić kod w wybranym repozytorium lub zahostować aplikacje w dowolnym serwisie, takim jak np. [Heroku](https://www.heroku.com/). Prosimy o maila z informacją, gdzie ten kod się znajduje.

### Klauzula

Repozytorium zawiera podpisane elektronicznie [oświadczenie](oswiadczenie.pdf) spółki DSM Intelligence Sp. z o.o. o niewykorzystywaniu w żaden sposób, niezwiązany z rekrutacją, nadesłanych przez Państwa rozwiązań.

### Dane kontaktowe

W razie jakichkolwiek pytań, prosimy kontaktować się na poniższe dane:

###### Email: *mateusz.malinowski@e-transkryptor.eu*
###### Numer kontaktowy: *+48 664 285 575* 

### Utworzenie projektu

W folderze zawierającym skopiowane repozytorium należy wykonać poniższą komendę, aby zainstalować wszystkie biblioteki.
```
yarn install
```
Jeśli otrzymaliby Państwo informację o błędzie związanym z niekompatybilnymi modułami, prosimy spróbować komendy
```
yarn install --ignore-engines
```
lub skontaktować się z nami drogą telefoniczną lub mailową.

### Kompilowanie oraz ładowanie zmian na żywo podczas developmentu

```
yarn serve
```

### Przygotowanie plików dla środowiska produkcyjnego

```
yarn build
```