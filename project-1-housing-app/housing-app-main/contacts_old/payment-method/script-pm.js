

const cardnumber = document.getElementById('cardnumber');
const expiration = document.getElementById('exdate')
var cardCode;

expiration.addEventListener('input', expirationFunc, true);

function expirationFunc()
{
    cardCode = this.value.replace(/[^\d]/g, '').substring(0,4);
    cardCode = cardCode != '' ? cardCode.match(/.{1,2}/g).join('/') : '';
    this.value = cardCode;
}
   

const payment = document.getElementsByName('payment');
function check()
{ 
    if(payment[1].checked){
        document.getElementById('hide-section').style.display = 'block'
    }
    else{
        document.getElementById('hide-section').style.display = 'none'
    }
    if(payment[2].checked){
        document.getElementById('hide-section2').style.display = 'block'
    }
    else{
        document.getElementById('hide-section2').style.display = 'none'
    }
 }

 cardnumber.addEventListener('input', cardMask, false)
 let cardNumb;
 function cardMask(){
  cardNumb = this.value.replace(/[^\d]/g, '').substring(0,16);
  cardNumb = cardNumb != '' ? cardNumb.match(/.{1,4}/g).join(' ') : '';
  this.value = cardNumb;
 }

 function saveCard()
 {
  document.getElementById('saved-card-expdate').innerHTML = cardCode;

    let last4num = '';
    for(i = cardNumb.length - 5; i < cardNumb.length; i++)
    {
      last4num += cardNumb[i];
    }
    let span = document.getElementById('saved-card-last4num');
    span.innerHTML = last4num;
   }