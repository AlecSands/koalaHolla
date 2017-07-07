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

  $('#viewKoalas').on('click', '.transferBtn', function () {
   console.log('transfer button clicked');
   var updateKoala = {};
   updateKoala.id = $(this).data('koalaid');
   updateKoala.readyForTransfer = $(this).data('transfer');
   if (updateKoala.readyForTransfer == "y"){
     updateKoala.readyForTransfer = "n";
   } else if (updateKoala.readyForTransfer == "n") {
     updateKoala.readyForTransfer = "y";
   }
   console.log(updateKoala);

   $.ajax({
     url: '/koalas',
     type: 'PUT',
     data: updateKoala,
     success: function(response) {
       getKoalas();
     }
   });
  });

}); // end doc ready



function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( receivedData ){
      console.log( 'got some koalas: ', receivedData );
      appendToDOM(receivedData.koalas);
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
    success: function( responseData ){
      console.log( 'got some koalas: ', responseData );
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
    $tr.append('<td><button class="transferBtn ' + koala.ready_for_transfer + '" data-koalaid="' + koala.id + '" data-transfer="' + koala.ready_for_transfer + '">Ready for Transfer</button></td>');
    $tr.append('<td>' + koala.notes + '</td>');
  //  $tr.append('<td><button class="editBtn">Edit</button></td>');
    $tr.append('<td><button class="deleteBtn" data-koalaid="' + koala.id + '">Delete</button></td>');
    $('#viewKoalas').append($tr);
  }
}
