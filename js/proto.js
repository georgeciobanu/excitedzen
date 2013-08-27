$(document).ready( function(){

  var theLine = null;

function makeLine(){
  x1 = 100; x2 = 500;
  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  var transform = 'rotate('+angle+'deg)';

    var line = $('<div>')
        .appendTo('#yeah')
        .addClass('line')
        .css({
          'position': 'absolute',
        '-webkit-transform':  transform,
        '-moz-transform':     transform,
        'transform':          transform
        })
        .width(length)
        .offset({left: x1, top: y1});

    return line;
}


  function transformLine(lineToTransform, x2,y2) {
    x1 = 10;
    y1 = 10;
    var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    console.log(x2);
    console.log(angle);

    var transform = 'rotate('+angle+'deg)';

    lineToTransform
        .css({
          'position': 'absolute',
        '-webkit-transform':  transform,
        '-moz-transform':     transform,
          
          'transform': transform
        })
        .width(length)
        .offset({left: x1, top: y1});
  }

  function createLine(xOrigin, yOrigin) {
    var length = 100;
    var transform = 'rotate(30deg)';

    var line = $('<div>')
        .appendTo('#yeah')
        .addClass('line')
        .css({
          'position': 'absolute',
        '-webkit-transform':  transform,
        '-moz-transform':     transform,
        'transform':          transform
        })
        .width(length)
        .offset({left: xOrigin, top: yOrigin});

      return line;
  }

  $("#yeah").mousedown(function(ev) {
    theLine = createLine($("#yeah").pageX, $("#yeah").pageY);
  });

  $("#yeah").mousemove(function(ev) {
    console.log(ev.pageX);
    if (theLine) {
      // redraw line
      transformLine(theLine, ev.pageX, ev.pageY);
    }
  });

  // $("#source").mouseup(function(ev) {
  //   // attach button to ng-hide
  //   if (theLine) {
  //     theLine.remove();
  //     theLine = null;      
  //   }
  // })


  var elementToInsert = null;
  var elHTML = "";

  function createElement(el) {


    //var tag = el.attr("data-value");
    var button = "<input type=\"button\" value=\"Button\" data-value=\"bootstrap/button\">";

    var textbox = "<input type=\"text\" placeholder=\"Type here...\" style=\"width:80px !important;\">";
    var text = "<p data-value=\"text\">You can show/hide me!</p>";

    switch ( elHTML ) {
      case "bootstrap/button": return $(button);
      case "bootstrap/textbox": return $(textbox);
      case "text": return $(text);      
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
  console.log(makeLine());


});