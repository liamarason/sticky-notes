$(document).ready(function() {
  loadNotes();

  $("#remove-all").click(removeNotes);
  $("#add-note").click(function(){
    addNote();
  })
});

/**
 Creates a new note and adds it to the sticky-notes div
 */
function addNote(text) {
  var newNote = $("<div class = 'note'></div>");
  var icons = $("<div class = 'icons'></div>");

  var tag = $("<i class = 'fa fa-tag' aria-hidden = 'true'></i>");
  var removeButton = $("<i class = 'fa fa-times' aria-hidden = 'true'></i>");
  var textBox = $("<textarea></textarea>");

  if (text != undefined) textBox.val(text);

  tag.click(changeColor);
  textBox.blur(saveNotes);
  removeButton.click(function() {
    newNote.remove();
    saveNotes();
  });

  icons.append(tag);
  icons.append(removeButton);

  newNote.append(icons);
  newNote.append(textBox);
  newNote.appendTo($("#sticky-notes"));
  saveNotes();
}

/**
 Removes all the notes from the sticky-notes div
 */
function removeNotes() {
  $(".note").remove();
  saveNotes();
}

/**
  Saves all the notes in the browser local storage
 */
function saveNotes() {
  var contents = [];
  $(".note").each(function() {
    contents.push($(this).find("textarea").val());
  });

  localStorage.setItem("notes", JSON.stringify(contents));
}

/**
  Loads the notes previously saved in the local storage (if any exist) and adds
  them to the sticky-notes div
 */
function loadNotes() {
  if (localStorage.notes != undefined) {
    var contents = JSON.parse(localStorage.getItem("notes"));

    for (var i = 0; i < contents.length; i ++) {
      addNote(contents[i]);
    }
  }
}

/**
  Change the color (options are yellow, blue, and pink) of a sticky note.
 */
function changeColor() {
  var note = $(this).parent().parent();
  var color = note.css("background-color");

  if (color === "rgb(255, 255, 0)") {
    note.css("background-color", "rgb(105, 205, 255)");
  } else if (color === "rgb(105, 205, 255)") {
    note.css("background-color", "rgb(255, 160, 220)");
  } else {
    note.css("background-color", "rgb(255, 255, 0)");
  }
}
