$(document).ready( function(){

  var elementToInsert = null;
  var elHTML = "";

  function createElement(el) {
    //var tag = el.attr("data-value");
    var button = "<input type=\"button\" value=\"Button\">";

    var textbox = "<input type=\"text\" placeholder=\"Type here...\" style=\"width:80px !important;\">";

    switch ( elHTML ) {
      case "bootstrap/button": return $(button);
      case "bootstrap/textbox": return $(textbox);
      default: return "whoops"
    }
    // console.log(el.attr("data-value"));
  }

  function handleDragStart(e) {
    $( ".component" ).css({opacity: 0.5});
    $(this).css({opacity: 1});
    elHTML = $(this).attr("data-value");
    console.log($(this).attr("data-value"));
  };

  function handleDragEnd(e) {
    $( ".component" ).css({opacity: 1});
    elHTML = "";
    if (elementToInsert) {
      elementToInsert.remove();      
    }

    elementToInsert = null;
  };

  function handleDragEnter(e) {
    // TODO(georgeciobanu): enable non-containers as drag targets,
    // defer to their parent
    $(this).css({opacity: 0.5});
    if (!elementToInsert) {
      elementToInsert = createElement();
    };
    $(this).append(elementToInsert);
  };

  function handleDragLeave(e) {
    $(this).css({opacity: 1});
    if (elementToInsert) {
      elementToInsert.remove();      
    }

    elementToInsert = null;
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