$(document).ready( function(){
   $( ".drop .drop2" ).droppable({
   	revert: true,
   	placeholder: "ui-state-highlight"

    });

   $( "#draggable" ).draggable({
   	connectToSortable: "#sortable",
    helper: "clone",
    revert: "invalid",
    cancel:false,

   });

});