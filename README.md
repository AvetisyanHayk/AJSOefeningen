# AJSOefeningen
Advanced JavaScript - Oefeningen

- [Oefening 1: Count Words](#oefening-1-count-words)
- [Oefening 2: Pokédex](#oefening-2-pokédex)
- [Oefening 3: This and First class functions](#oefening-3-this-and-first-class-functions)
  - [Oefening 3-1: Favorites](#oefening-3-1-favorites)
  - [Oefening 3-2: Fibonacci](#oefening-3-2-fibonacci)
  - [Oefening 3-3: Console-Wrapper](#oefening-3-3-console-wrapper)
- [Oefening 4: Just for fun](#oefening-4-just-for-fun)
- [Oefening 5: Hostpital](#oefening-5-hospital)



## Oefening 1: Count Words

Write a JavaScript program that counts the **frequency** of the words in a text. The word `the`, for instance, occurred three times in the last sentence. We want to know these numbers for all words in any text. We also want to be able to ignore some words in our result, because they occur very frequently and are of no interest for the content, e.g., `the`.

#### Battle Plan

1. Plain text (a string)
2. text 2 array - split on space
3. array clean content of punctuation
4. remove all empty strings for the array
5. remove all the "please ignore" words
6. convert to lower case
7. count with frequency table : `[ {word:"joske", count:1} , ...]`
   1. look for word
   2. if found `+1`
   3. else add new `entry`
8. sort (try it yourself, insertion sort or any other algo)
9. Table with word frequencies.

Don't be scare to write a lot of small functions that do one thing.

#### Extra

If you finished the above exercise, you can turn your frequency table into a word cloud or provide us with a decent layout and markup.



## Oefening 2: Pokédex

Develop a client-side JavaScript web application that allows a user to filter Pokémon based on their properties (size + type) and allows them to be "caught" (added to a list).

#### Source files

Given is a JSON-file `pokedex.js` as well as the various images (one per Pokémon + the Pokémon logo).

#### Your task

Build the following web UI, using which the Pokedex-DB can be queried and matching Pokémon can be added to the list.

- Upon application launch, the first field displays the following possible sizes:
  - `isAny`
  - `isSmall`
  - `isMedium`
  - `isLarge`
- The second field displays the catch-all condition **`isAny`** but also all the various types of Pokémon that exist in the file `pokedex.js`. These should be retrieved dynamically:
- When the user selects a size and condition filter, the third field automatically displays the corresponding Pokémon:
- Once the user clicks the `Catch!` button, the selected Pokémon is added to the list and displayed at the bottom of the page:

#### Some attention points

- Use as many built-in array functions as possible (when appropriate).

- Populate the second field with all types of Pokémon, based on the information found in the file `pokedex.js`. The types should be sorted alphabetically and there shouldn't be any doubles. (**HINT**: *first decide upon a battle-plan before you start coding: i.e., which array functions do I need and in which order*)

- Before you can enable the filters, you'll need predicate functions that can check both the size and type of a Pokémon. A predicate is just a function that returns a `boolean` (No magic, "predicate" just a name).

  ```
  var isAny = function(pokemon) {
      return true;
  }
  ```

- Write the predicates `isSmall`, `isMedium` and `isLarge` to check whether a Pokémon is less than a meter tall (**small**), taller than 2 meters (**large**) or somewhere in between (**medium**).

- ~~Now, also write a function `makeTypePredicate` which returns a predicate that determines whether a certain Pokémon belongs to a given type. The following pseudo code might be of assistance:~~

  ```
  var isGrass = makeTypePredicate("grass");
  if (isGrass(pokemon)) {
      console.log(pokemon.name + " is a grass Pokémon.");
  } else {
      console.log(pokemon.name + " isn't a grass Pokémon.");
  }
  ```




## Oefening 3: This and First class functions

### Oefening 3-1: Favorites

Given are an HTML page and the associated JavaScript file. Complete the JavaScript code so that the application allows the user to add their favorite websites to the `<ul>`. 

- `app.hookUpEventHandler`: hooks-up the event handler for the submit button and contains the necessary code to retrieve the input from both text fields and add an URL to the list


- `getAndClearInput`: do not modify this function
- `addUrl`: do not modify this function
- when document is ready: add the right calls to `app.addUrl` here so http://www.howest.be and http://www.google.be are added to the list upon launch


### Oefening 3-2: Fibonacci

Write a JavaScript program to calculate the *n*<sup>th</sup> number in the **Fibonacci** sequence. ~~Develop a recursive function `fib` to achieve this.~~

***Challenge:*** What is the largest number you can compute in under 1 minute?

### Oefening 3-3: Console-Wrapper

Write a "wrapper" for `console.log` that:

1. Still outputs to the console
2. But also adds the text to a `<div>` (e.g. `id="console"`) on a webpage.

For example:

```
var myLog = makeMyLog(console.log, "console");
myLog.log("Hello world!"); // Hello world! appears on the console
// and in the div with id "console" as well
```



## Oefening 4: Just for fun

An alternative to switch-bulbs exercise.



## Oefening 5: Hospital

### Assignment

We develop JavaScript-HTML that could be the basis for an administrative application for a hospital.

We provide an overview of doctors and patients, which can be assigned to the hospital (drag-and-drop). 

### Non-Functional Requirements

- Use **module pattern**: Separate "interface logic" (handling input/events of the user, ...) as much as possible from the "Business Logic" (how doctors and patients work).
- Use **prototypal inheritance**: objects should be able to do as much as possible by themselves.

### Objects

Implement `Patient` en `Doctor` as objects and apply best-practices.

#### Patient

- A `Patient` is a `Person`: `name`, `age`, and `gender`. 
- A persons title is either `Mr.` of `Ms.` depending on the gender.
- A patient has a single symptom.

#### Doctor

- A `Doctor` is a `Person`: `name`, ~~`age`~~, and `gender`. 
- A doctors title is `Dr.` regardless of the gender.
- A doctor has a single specialty.

#### Rendering

Patients and doctors are rendered in exactly the same way (HTML-wise).
Make sure that the objects themselves are responsible for the rendering (possible making use of the interface-module). This means that both patients and doctors must have a `render()`-function. Of course, this `render()`-function can make use of the interface module.

### Interface Requirements

- All doctors and patients are loaded at start-up time from the array of persons (`data.js`). 
- Patients are loaded into the `<header>`.
- Doctors are loaded into the `<footer>`.
- When dragging a person, the css-class `droppable ` is activated on the hospital. The class is removed when the drag is over (see screencast).
- When dragging a person the css-class `dragged ` is activated on the person (see screencast).
- When a person is dropped onto the hospital, visual feedback is given:
  - `Ms. Alice has been admitted in the hospital with Respiratory issues.`;
  - `Dr. House has started working in the hospital as Pulmonologist. ` 

### Icons

Make use of the correct 'icons': All doctors and patients are represented using two icons: one to show the person, one to show the symptom or specialty. ~~You can 'create' these icons in JavaScript using the `IconMap` (see source files):~~

 ~~`personIconMap.create('teethDoctorMale')`;~~

~~Returns a `<span>`-element with the requested icon in the correct size.~~ 
~~In the example case a male dentist. The ```<span>```-element then easily be loaded into the HTML.~~ 

### Patients

- `Patient < 3`:  `baby`
- `Patient < 16`: `child`
- `Patient < 75`: `adult`
- `Patient > 75`: `elderly`

Use the `personIconMap` and the conversion data from `data.js` to retrieve the right icon. Also take the gender into account.

### Doctors

- A doctor has his/her own icon (`heartDoctorMale`, `heartDoctorFemale`, ...) depending on the specialization and gender combined.

Use the `personIconMap` and the conversion data from `data.js` to retrieve the right icon. Also take the gender into account.

### Symptoms and Specialisations

Both doctors and patients have an icon of a disease/specialization. Use the `organIconMap `  and the conversion data from `data.js` to retrieve the right icon.