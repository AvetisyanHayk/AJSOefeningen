# AJSOefeningen
Advanced JavaScript - Oefeningen

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

