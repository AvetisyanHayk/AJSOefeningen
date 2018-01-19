var findPokemonById = function (id) {
    for (var i = 0; i < pokedex.length; i++) { // performance reasons
        if (pokedex[i].id === parseInt(id)) {
            return pokedex[i];
        }
    }
};

var isAny = function (pokemon) {
    return true;
};

var isSmall = function (pokemon) {
    return getHeight(pokemon) < 1;
};

var isMedium = function (pokemon) {
    var height = getHeight(pokemon);
    return height >= 1 && height < 2;
};

var isLarge = function (pokemon) {
    return getHeight(pokemon) >= 2;
};

var textComparator = function (t1, t2) {
    t1 = t1.toLowerCase();
    t2 = t2.toLowerCase();
    if (t1 < t2) return -1;
    else if (t1 > t2) return 1;
    return 0;
};

var pokemonNameComparator = function (p1, p2) {
    var name1 = p1.name;
    var name2 = p2.name;
    return textComparator(name1, name2);
};

var getHeight = function (pokemon) {
    return parseFloat(pokemon.height.replace(" m", ""));
};

var getType = function (pokemon) {
    return pokemon.type;
};

var textToOption = function (text) {
    return $('<option>').text(text);
};

var pokemonToOption = function (pokemon) {
    return $('<option>').val(pokemon.id).text(pokemon.name);
};

var pokemonToFigure = function (pokemon) {
    var $figcaption = $('<figcaption>').text(pokemon.name);
    var $img = $('<img>').attr({
        alt: pokemon.name,
        src: pokemon.img
    });
    return $('<figure>').append($img).append($figcaption);
};

var pokemonToListItem = function (pokemon) {
    var $figure = pokemonToFigure(pokemon);
    return $('<li>').append($figure);
};

var updateTypeFilters = function (e) {
    var selectedSize = $('#pokeSize').find('option:selected').text();
    var sizeFilter = window[selectedSize];
    var types = [];
    var pushDistinctType = createPushDistinctTypes(types);
    pokedex.filter(sizeFilter).map(getType).forEach(pushDistinctType);
    types.sort(textComparator).unshift("isAny");
    fillTypes(types);
    updatePokemons();
};

var createPushDistinctTypes = function (uniqueArray) {
    return function (types) {
        types.forEach(function (type) {
            if (uniqueArray.indexOf(type) === -1) {
                uniqueArray.push(type);
            }
        })
    }
};

var fillTypes = function (types) {
    var $types = $('#pokeType');
    var selected = $types.find('option:selected').text();
    var $items = types.map(textToOption);
    $types.empty().append($items);
    if (selected && types.indexOf(selected) >= 0) {
        $types.val(selected);
    }
};

var filterByType = function (pokemon) {
    var typeFilter = $('#pokeType').find('option:selected').text();
    return pokemon.type.indexOf(typeFilter) >= 0;
};

var updatePokemons = function (e) {
    var selectedSize = $('#pokeSize').find('option:selected').text();
    var sizeFilter = window[selectedSize];
    var pokemons = pokedex.filter(sizeFilter);
    var typeFilter = $('#pokeType').find('option:selected').text();
    if (typeFilter !== "isAny") {
        pokemons = pokemons.filter(filterByType);
    }
    pokemons.sort(pokemonNameComparator);
    fillPokemons(pokemons);
};

var fillPokemons = function (pokemons) {
    var $pokeMatch = $('#pokeMatch');
    var $items = pokemons.map(pokemonToOption);
    var selected = $pokeMatch.find('option:selected').val();
    $pokeMatch.empty().append($items);
    if (selected && pokemons.indexOf(selected) >= 0) {
        $pokeMatch.find('option[value="' + selected + '"]').attr("selected", selected);
    }
    $('input[type="submit"]').prop("disabled", $items === undefined || $items.length === 0);
};

var catchPokemon = function (e) {
    e.preventDefault();
    var pokeId = $('#pokeMatch').val();
    var pokemon = findPokemonById(pokeId);
    if (pokemon) {
        var $catch = $('#pokeCatch');
        $catch.find('li:contains(none):visible').hide();
        $catch.append(pokemonToListItem(pokemon));
    }
};

var init = function () {
    updateTypeFilters();
    $('#pokeSize').on("change", updateTypeFilters);
    $('#pokeType').on("change", updatePokemons);
    $('#pokeForm').on("submit", catchPokemon);
};

$(document).ready(init);