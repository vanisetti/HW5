/* 
Vijaya Anisetti
vijaya_anisetti@student.uml.edu
Assignment : Scrabble Board Implementation
File: hw5.js
Description: This file carries the back of this assignment. It takes care of the functions of
 the scrabble board. It assigns an array for the individual tiles and creatres function 
 that allow us to add new tiles, reset the game, create the dropp and drag feature and more
*/

/* Using Prof. Heines Website for associative array and images
https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-lecs/lecture26.jsp
https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Tiles.zip*/

   var tiles = [] ;
   tiles["A"] = { "value" : 1,  "original" : 9,  "remaining" : 9  } ;
   tiles["B"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
   tiles["C"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
   tiles["D"] = { "value" : 2,  "original" : 4,  "remaining" : 4  } ;
   tiles["E"] = { "value" : 1,  "original" : 12, "remaining" : 12 } ;
   tiles["F"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
   tiles["G"] = { "value" : 2,  "original" : 3,  "remaining" : 3  } ;
   tiles["H"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
   tiles["I"] = { "value" : 1,  "original" : 9,  "remaining" : 9  } ;
   tiles["J"] = { "value" : 8,  "original" : 1,  "remaining" : 1  } ;
   tiles["K"] = { "value" : 5,  "original" : 1,  "remaining" : 1  } ;
   tiles["L"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
   tiles["M"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
   tiles["N"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
   tiles["O"] = { "value" : 1,  "original" : 8,  "remaining" : 8  } ;
   tiles["P"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
   tiles["Q"] = { "value" : 10, "original" : 1,  "remaining" : 1  } ;
   tiles["R"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
   tiles["S"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
   tiles["T"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
   tiles["U"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
   tiles["V"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
   tiles["W"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
   tiles["X"] = { "value" : 8,  "original" : 1,  "remaining" : 1  } ;
   tiles["Y"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
   tiles["Z"] = { "value" : 10, "original" : 1,  "remaining" : 1  } ;
   tiles["["] = { "value" : 0,  "original" : 2,  "remaining" : 2  } ;
   

   var game_rack = [];
   
   var table_keys = Object.keys( tiles ).length;
   var rack_keys = Object.keys( game_rack ).length;
   
 
   var game_score = 0;
   
    //checks for existing tiles
   var tile_exist = [false, false, false, false, false, false, false, false];
   
   //random tile generator
   function random_tile(){
       return Math.floor((Math.random() * 27));
   }
   





   //function to create the rack
   function rack_build(){
   
       var STARTING_TILE_MAX = 7;
       var rack_count = 1;
       var src;
       var id;
       var title;
       var tileClass = "game_tile";
   
       tile_exist = [false, false, false, false, false, false, false, false];
       $('#rack_div div').empty();
   
       for( var i = 0; rack_count <= STARTING_TILE_MAX; i++) {
   
           var randTile = random_tile();
   
           if( tiles[ String.fromCharCode(65 + randTile) ][ "remaining"] !== 0 && remaining_tiles()){
   
               game_rack[rack_count] = {"letter" : String.fromCharCode(65 + randTile),"value" : tiles[ String.fromCharCode(65 + randTile) ][ "value" ]};
               tiles[ String.fromCharCode(65 + randTile) ][ "remaining"]--;
               rack_keys = Object.keys( game_rack ).length;
   
               id = "tile" + rack_count;
               title = game_rack[rack_count][ "letter" ];
               src = "img/Scrabble_Tile_" + game_rack[rack_count][ "letter" ] + ".jpg";
   
               $('#game_rack').prepend($('<img>',{id:id,src:src,class:tileClass,title:title}));
               rack_count++;
           }
   
           if(remaining_tiles() == false ) {
               $('#tileButtonDiv').append("<p id='noTileLeft'>No Tiles Left</p>");
               $("#new_tile").prop("disabled",true);
   
               //tile_print();
   
               return;
           }
   
           $("#" + id).draggable({ snap: ".board, .trashTile", snapMode: "inner"});
       }
       score_update();
   }
   






   //check for remaining tiles
   function remaining_tiles() {
   
       var tile_exist = false;
       var offset = 0;
   
       while( offset < 27 ) {
   
           if(tiles[ String.fromCharCode(65 + offset) ][ "remaining" ] !== 0) {
               tile_exist = true;
           }
           offset++;
       }
   
       return tile_exist;
   }
   






   //checks for bonus values and access the value of the tiles to maintain the score
   function dropped_tile(event, ui) {
   
       if(tile_exist[$(this).attr("id") -1] == false && $(this).attr("title") === 'doubleLetter'){
           game_score += (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2 );
       }
       else if(tile_exist[$(this).attr("id") -1] == false && $(this).attr("title") === 'tripleLetter'){
           game_score += (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 3 );
       }
       else if(tile_exist[$(this).attr("id") -1] == false && $(this).attr("title") === 'blank'){
           game_score += (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] );
       }
       else if(tile_exist[$(this).attr("id") -1] == false && $(this).attr("title") === 'doubleWord'){
   
           game_score = ((game_score + tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] ) * 2 );
       }
   
       tile_exist[$(this).attr("id") -1 ] = true;

       
   
       score_update();

       $(this).draggable('disable');
   
   }
   





   // function determines what will happen when a tile is removed 
   function remove_tile(event, ui) {
   
       if(tile_exist[$(this).attr("id") -1] == true && $(this).attr("title") === 'doubleLetter'){
           game_score -= (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2 );
       }
       else if(tile_exist[$(this).attr("id") -1] == true && $(this).attr("title") === 'tripleLetter'){
           game_score -= (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 3 );
       }
       else if(tile_exist[$(this).attr("id") -1] == true && $(this).attr("title") === 'blank'){
           game_score -= (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] );
       }
       else if(tile_exist[$(this).attr("id") -1] == true && $(this).attr("title") === 'doubleWord'){
           game_score = (( game_score / 2) - (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] ));
       }
   
       tile_exist[$(this).attr("id") -1 ] = false;
   
       score_update();
   }
   





   
   //function to reset the game board
   function reset() {
   
       var STARTING_TILE_MAX = 7;
       var rack_count = 1;
       var src;
       var id;
       var title;
       var tileClass = "game_tile";
   
       tile_exist = [false, false, false, false, false, false, false, false];
       $('#rack_div div').empty();
   
       for( var i = 0; rack_count <= STARTING_TILE_MAX; i++) {
   
           var randTile = random_tile();

           if( tiles[ String.fromCharCode(65 + randTile) ][ "remaining"] !== 0 && remaining_tiles()){
   
               game_rack[rack_count] = {"letter" : String.fromCharCode(65 + randTile),"value" : tiles[ String.fromCharCode(65 + randTile) ][ "value" ]};
               tiles[ String.fromCharCode(65 + randTile) ][ "remaining"]--;
               rack_keys = Object.keys( game_rack ).length;
   
               id = "tile" + rack_count;
               title = game_rack[rack_count][ "letter" ];
               src = "img/Scrabble_Tile_" + game_rack[rack_count][ "letter" ] + ".jpg";
   
               $('#game_rack').prepend($('<img>',{id:id,src:src,class:tileClass,title:title}));
               rack_count++;
           }
   
           if(remaining_tiles() == false ) {
               $('#tileButtonDiv').append("<p id='noTileLeft'>No Tiles Left</p>");
               $("#new_tile").prop("disabled",true);
   
               return;
           }
   
           $("#" + id).draggable({ snap: ".board, .trashTile", snapMode: "inner"});
       }
   
       $("#new_tile").prop("disabled",false);
       $('#noTileLeft').remove();
   
       for ( k = 0 ; k < table_keys ; k++ ) {
           tiles[ String.fromCharCode(65 + k) ][ "remaining"] = tiles[ String.fromCharCode(65 + k) ][ "original" ];
       }
   
       game_score = 0;
   
       score_update();
       tile_print();
       rack_build();
   }
   




   // function updates the score of the game
   function score_update(){
   
       $('#score_board').text(game_score);
       tile_update();
   }
   





   function tile_removed( event, ui ){
   
       tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "remaining"]++;
   
       var split = ui.draggable.attr("id").split("");
       var randTile;
   
       while(1) {
   
           randTile = random_tile();
   
           if( tiles[ String.fromCharCode(65 + randTile) ][ "remaining"] ) {
   
               game_rack[split[4]] = {"letter" : String.fromCharCode(65 + randTile),"value" : tiles[ String.fromCharCode(65 + randTile) ][ "value" ]};
               tiles[ String.fromCharCode(65 + randTile) ][ "remaining"]--;
   
               var id = "tile" + split[4];
               var title = game_rack[split[4]][ "letter" ];
               var src = "img/Scrabble_Tile_" + game_rack[split[4]][ "letter" ] + ".jpg";
   
               break;
           }
       }
       
       
       $('#' + ui.draggable.attr("id")).remove();
   
       
       $('#game_rack').append($('<img>',{id:id,src:src,class:"game_tile",title:title}));
   
       
       $("#" + id).draggable({ snap: ".board, .trashTile", snapMode: "inner"});
   
       tile_update();
   }
   



   
   //updates the remaining amount of tiles left in the game 
   function tile_update() {
   
       var temp;
   
       for ( k = 0 ; k < table_keys ; k++ ) {
   
           temp = String.fromCharCode(65 + k);
   
           if( temp == "[") {
               temp = "ZZ";
           }
   
           $("#" + temp).text(tiles[ String.fromCharCode(65 + k)]["remaining"]);
       }
   }
   


/*

   function check_if_word_exists(word) {
    const url = "https://api.wordnik.com/v4/word.json/" + word + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

    $.ajax({
        type: "GET",
        url: url
    }).done(function (result) {
        console.log("word exists");
    }).fail(function () {
        console.log("word does not exist");
    });
}

*/


   //functions called 
   $(document).ready(function(){
   
       
       rack_build();
   
       $(".board").droppable({  drop: dropped_tile}); /*,drop: dropped_tile, out:remove_tile */
       /*function(event, ui){
        $(this).draggable('disable');} */

       $(".buttonrow").droppable({ drop: tile_removed });
       $(".container1").droppable({ drop: tile_removed });
       $(ui.draggable).css("top", "");
       $(ui.draggable).css("left", "");
       $(this).append(ui.draggable);
      /* $(".idk").droppable({ drop: tile_removed });*/
   
   });
