/*
 Punyamurthula, Sindhuri    Account:  jadrn043
                     CS645, Spring 2017                 
					 Project #2
*/

$(document).ready( function() {
    $("[name='username']").focus();
    
    $(':submit').on('click', function(e) {
        if($("[name='username']").val().trim() == "") {
            $('#status').text('Please enter your username.');
            $("[name='username']").focus();
            e.preventDefault(); 
            }
        else if($("[name='password']").val().trim() == "") { 
            $('#status').text('Please enter your password.');
            $("[name='password']").focus();
            e.preventDefault(); 
            }         
        else
            return;
        });      
    });
