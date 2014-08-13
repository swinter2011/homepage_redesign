
/*

Copyright 2014 Mayday PAC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function updateTotal(totalCents) {
  var totalRaised = (totalCents / 100) + 1000000;
  totalRaised = Math.round(totalRaised);
  $('#totalAmount').text('$' + addCommas(totalRaised));
}

//prefill form data
function prefillFormData($storedData,dataName,inputName){
  var $input = $('input[name='+inputName+']'),
      dataValue = $storedData[dataName],
      isDefined = typeof dataValue != 'undefined' && dataValue != '';
  if(isDefined){
    $input.val(dataValue);
    if($input.prop('type') != 'hidden'){
      $input.parent().addClass('prefilled');
      $input.parent().append('<span>'+dataValue+' <small><a href="#">Change</a></small></span>');
      $input.parent().find('span small a').on('click', function(e){
        e.preventDefault();
        $input.parent().removeClass('prefilled');
        $input.parent().find('span').remove();
      });
    }
  }
}

$(document).ready(function () {
  jQuery.getJSON('https://pledge.mayday.us/r/total',
               function(data) {
                 updateTotal(data.totalCents);
               });

  jQuery.getJSON('https://pledge.mayday.us/r/num_pledges',
              function(data) {
                $('#numPledges').text(addCommas(data.count));
              });

  // javascript is so awesome. this is how you write June 1st. Cause June is the
  // 5th month, indexed by zero. thanks javascript!
  var date_its_over = Date.UTC(2014,10,05,10,00,00,00);
  var days_left = Math.ceil((date_its_over - Date.now())/(1000*24*60*60));
  var days_left_message = '' + days_left + ' days left';
  if (days_left == 1) {
   days_left_message = '' + days_left + ' day left';
  }

  var hours_left = Math.ceil((date_its_over - Date.now())/(1000*60*60));
  var hours_left_message = '' + hours_left + ' hours left';
  if (hours_left == 1) {
   hours_left_message = '' + hours_left + ' hour left';
  }

  $('#daysLeft').text(days_left_message);
});
