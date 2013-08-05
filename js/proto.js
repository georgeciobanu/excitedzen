$(document).ready( function(){

  var elementToInsert = null;

  function createElement(el) {
    var tag = el.attr("data-value");
    var button = "<input type=\"button\" value=\"Button\">";

    var textbox = "<input type=\"text\" placeholder=\"Type here...\" style=\"width:80px !important;\">";

    switch ( tag ) {
      case "bootstrap/button": return $(button);
      case "bootstrap/textbox": return $(textbox);
      default: return "whoops"
    }
    // console.log(el.attr("data-value"));
  }

  function handleDragStart(e) {
    $( ".component" ).css({opacity: 0.5});
    $(this).css({opacity: 1});

    elementToInsert = createElement($(this));
  };

  function handleDragEnd(e) {
    $( ".component" ).css({opacity: 1});
    elementToInsert = null;
  };

  function handleDragEnter(e) {
    $(this).css({opacity: 0.5});
    $(this).append(elementToInsert);
  };

  function handleDragLeave(e) {
    $(this).css({opacity: 1});
    //$(this).remove(elementToInsert);
  };

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    
  };

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    $(this).css({opacity: 1});

    // Restore dragged component to 100% opacity
    $( ".component" ).css({opacity: 1});
    elementToInsert = null;

    return false;
  };


  $( ".component" ).on("dragstart", handleDragStart);
  $( ".component" ).on("dragend", handleDragEnd);
  $( ".drop" ).on("dragenter", handleDragEnter);
  $( ".drop" ).on("dragleave", handleDragLeave);
  $( ".drop" ).on("dragover", handleDragOver);
  $( ".drop" ).on("drop", handleDrop);  



});