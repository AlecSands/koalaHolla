console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    $('#viewKoalas').empty();
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    console.log(objectToSend);
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      appendToDOM(data.koalas);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
     // end success
    getKoalas();
  }
  }); //end ajax
}

function appendToDOM(koalaHolla) {
  $('#viewKoalas').empty();
  for (var i = 0; i < koalaHolla.length; i += 1) {
    var koala = koalaHolla[i];

    $tr = $('<tr></tr>');
    $tr.data('koala', koala);
    $tr.append('<td>' + koala.id + '</td>');
    $tr.append('<td>' + koala.name + '</td>');
    $tr.append('<td>' + koala.gender + '</td>');
    $tr.append('<td>' + koala.age + '</td>');
    $tr.append('<td>' + koala.read_for_transfer + '</td>');
    $tr.append('<td>' + koala.notes + '</td>');
  //  $tr.append('<td><button class="editBtn">Edit</button></td>');
    $tr.append('<td><button class="deleteBtn" data-koalaid="' + koala.id + '">Delete</button></td>');
    $('#viewKoalas').append($tr);
  }
}
