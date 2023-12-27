const orderItemArr = [];
const orderPriceArr = [];
const orderArr = [];
const orderIdArr = [];
const orderListArr = [];

function passData(e){
  //console.log("success -- passdata");

  const item = e.getAttribute("data-item");
  const imgUrl = e.getAttribute("data-img");
  //console.log(category);

  //neutralize value of quantity
  document.getElementById('btn-add-order').setAttribute("data-qty", 0);

  let html = '';

  html = '<div class="col-md-2">';
  html += '<span class="modal-image rounded-3 overflow-hidden"><img src="'+imgUrl+'"></span>';
  html += '</div>';
  html += '<div class="col-md-7">';
  html += '<h3 class="mb-0">'+item+'</h3>';


    const cpPrice = e.getAttribute("data-cp-price");
    const cnPrice = e.getAttribute("data-cn-price");

    html += '<div class="row">';
      //html += '<div class="col-md-12"><small class="text-danger additional-cost fw-bold"><i class="fa-solid fa-triangle-exclamation text-warning"></i> Additional Cost for Cone</small></div>';
      html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" onclick="selectCategory(this)" data-cat="CP" data-price="'+cpPrice+'" checked="checked"> Cup:</label></div>';
      html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cpPrice).toFixed(2)+'</span></div>';
      html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" value="CN" onclick="selectCategory(this)" data-cat="CN" data-price="'+cnPrice+'"> Cone:</label></div>';
      html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cnPrice).toFixed(2)+'</span></div>';
    html += '</div>';


  html += '</div>';

  html += '<div class="col-md-3 text-end">';
  html += '<div class="mb-1"><button class="keypad-num" onclick="qtyAdjust(0)"><i class="fa-solid fa-minus"></i></button><span id="modal-qty">0</span><button class="keypad-num" onclick="qtyAdjust(1)"><i class="fa-solid fa-plus"></i></button></div>';
  /*Number Keypad*/
  html += '<button class="keypad-num" onclick="qtyInsert(7)">7</button><button class="keypad-num" onclick="qtyInsert(8)">8</button><button class="keypad-num" onclick="qtyInsert(9)">9</button>';
  html += '<button class="keypad-num" onclick="qtyInsert(4)">4</button><button class="keypad-num" onclick="qtyInsert(5)">5</button><button class="keypad-num" onclick="qtyInsert(6)">6</button>';
  html += '<button class="keypad-num" onclick="qtyInsert(1)">1</button><button class="keypad-num" onclick="qtyInsert(2)">2</button><button class="keypad-num" onclick="qtyInsert(3)">3</button>';
  html += '<button class="keypad-num col-span-3" onclick="qtyInsert(0)">0</button>';
  html += '</div>';

  document.getElementById('modal-order-item').innerHTML = html;
  document.getElementById('btn-add-order').setAttribute("data-item", item);
  document.getElementById('btn-add-order').setAttribute("data-img", imgUrl);
  //check price??
  //document.getElementById('btn-add-order').setAttribute("data-price", '390');

  selectCategory();
}

let i = 0;

function orderCart(e){
  const item = e.getAttribute("data-item");
  const price = e.getAttribute("data-price");
  const imgUrl = e.getAttribute("data-img");
  let qty = e.getAttribute("data-qty");
  const itemCategory = e.getAttribute("data-cat");
  var itemPrice = price * qty;

  orderIdArr.push(i);
  orderItemArr.push(item);
  orderPriceArr.push(itemPrice);
  orderArr.push(item, price, imgUrl);
  orderListArr.push([item, qty, price]);
  //console.log(orderArr);

  let orderList = document.getElementById('cart-list');
  var html = '<li class="row px-3 py-2">';
        html += '<div class="col-md-2"><span class="cart-img rounded-3"><img src="'+imgUrl+'"></div>';
        html += '<div class="col-md-6"><span class="cart-cat text-primary">'+itemCategory+'</span> <span class="cart-item">'+item+'</span><br>';
        html += '<span class="cart-price"><span class="item-cart-qty"><button class="keypad-num btn btn-danger p-0" onclick="cartQty(this, 0, '+i+', '+price+')"><i class="fa-solid fa-minus"></i></button> <span class="item-qty">'+qty+'</span> <button class="keypad-num btn btn-success p-0" onclick="cartQty(this, 1, '+i+', '+price+')"><i class="fa-solid fa-plus"></i></button></span> x'+price+'</span></div>';
        html += '<div class="col-md-3 text-end"><span class="cart-item-prc fw-bold h6">₱ <span class="item-qty-price">'+parseFloat(itemPrice).toFixed(2)+'</span></div>';
        html += '<div class="col-md-1 text-end p-0"><button onclick="deleteItem('+i+', this)" class="btn btn-danger btn-trash"><i class="fa-regular fa-trash-can"></i></button></div>';
      html += '</li>';

  orderList.innerHTML+=html;

  totalItems();
  costItems();

  i++;
  //console.log(orderIdArr);
}

function totalItems(){
  document.getElementById('total-item').innerText = orderItemArr.length;
}

function costItems(){
  console.log(orderPriceArr);

  if(orderPriceArr.length===0){
   document.getElementById('total-cost').innerText = "0.00";
   enableCashAmount();
   enableCompleteTrans();
   amountRecount();
  }else{
    let sum = orderPriceArr.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue), 0);
    document.getElementById('total-cost').innerText = parseFloat(sum).toFixed(2);
    enableCashAmount();
    enableCompleteTrans();
    amountRecount();
    //console.log( parseFloat(sum).toFixed(2) );
  } 
}

function clearCart(){
  let orderList = document.getElementById('cart-list');
  orderList.innerHTML = "";
  orderItemArr.length = 0;
  orderPriceArr.length = 0;
  orderArr.length = 0;
  orderIdArr.length = 0;
  orderListArr.length = 0;
  i = 0;
  totalItems();
  costItems();
}

function deleteItem(id, e){
  let orderList = document.getElementById('cart-list');

  const indexId = orderIdArr.indexOf(id);
  orderIdArr.splice(indexId, 1);
  orderItemArr.splice(indexId, 1);
  orderPriceArr.splice(indexId, 1);
  orderArr.splice(indexId, 1);
  orderListArr.splice(indexId, 1);

  totalItems();
  costItems();
  orderList.removeChild(e.parentElement.parentElement);
}

function qtyInsert(num){
  //console.log(num);
  let qty = document.getElementById("modal-qty");
  
  //console.log(num);

  if(qty.innerHTML==0){
    qty.innerHTML = num;
    document.getElementById('btn-add-order').setAttribute("data-qty", num);
    btnEnabler();
  }else{
    var modalQty = qty.innerHTML + num;
    qty.innerHTML = modalQty.toString().substring(0, 3);
    document.getElementById('btn-add-order').setAttribute("data-qty", modalQty);
    btnEnabler();
  }
}

function qtyAdjust(num) {
  //console.log(num);
  let qty = document.getElementById("modal-qty");

  if(num==0){
    if(qty.innerHTML!=0){
      var itemQty = parseInt(qty.innerHTML) - 1;
      qty.innerHTML = itemQty;
      document.getElementById('btn-add-order').setAttribute("data-qty", itemQty);
      btnEnabler();
    }
  }else{
    var itemQty = parseInt(qty.innerHTML) + 1;
    qty.innerHTML = itemQty;
    document.getElementById('btn-add-order').setAttribute("data-qty", itemQty);
    btnEnabler();
  }

}



function cartQty(event, num, id, price){
  let parent = event.parentElement; // target element .item-cart-qty
  let children = parent.querySelector('.item-qty').innerText;
  //console.log(children); 

  // Add qty
  if(children!='' && num==1){
    var totalQty = parseInt(children) + 1;
    parent.querySelector('.item-qty').innerText = totalQty;

    orderPriceArr[id] = totalQty*price;
    orderListArr[id][1]=totalQty;
    costQtyItems(parent, totalQty*price);

  }else{ // Minus qty
    var totalQty = parseInt(children) - 1;

    parent.querySelector('.item-qty').innerText = totalQty;
    orderPriceArr[id] = totalQty*price;
    orderListArr[id][1]= totalQty;

    costQtyItems(parent, totalQty*price);

    if(children==1){
      //Remove Item
      let orderList = document.getElementById('cart-list');

      const indexId = orderIdArr.indexOf(id);
      orderIdArr.splice(indexId, 1);
      orderItemArr.splice(indexId, 1);
      orderPriceArr.splice(indexId, 1);
      orderArr.splice(indexId, 1);
      orderListArr.splice(indexId, 1);

      costQtyItems(parent, totalQty*price);
      orderList.removeChild(parent.parentElement.parentElement.parentElement);
    }
  }

  console.log(orderPriceArr);
  totalItems();
  costItems();
  
}

function costQtyItems(event, num){
  //console.log(event);
  let parent = event.parentElement.parentElement.parentElement; // target element <li class="row px-3 py-2">
  let children = parent.querySelector('.item-qty-price');

  children.innerHTML = parseFloat(num).toFixed(2);

  //console.log(parent);
}



function selectCategory(e){
  if(e){
    let price = e.getAttribute("data-price");
    let cat = e.getAttribute("data-cat");

    document.getElementById('btn-add-order').setAttribute("data-cat", cat);
    document.getElementById('btn-add-order').setAttribute("data-price", price);
    btnEnabler();
  }else{
    let r = document.querySelector('input[name="gelato-category"]:checked');
    let price = r.getAttribute("data-price");
    let cat = r.getAttribute("data-cat");

    //console.log("triggered");
    document.getElementById('btn-add-order').setAttribute("data-cat", cat);
    document.getElementById('btn-add-order').setAttribute("data-price", price);
    btnEnabler();
  }

}

function btnEnabler(){
  let btn = document.getElementById('btn-add-order');
  var qty = btn.getAttribute("data-qty");

  if(qty==0){
    document.getElementById("btn-add-order").disabled = true;
  }else{
    document.getElementById("btn-add-order").disabled = false;
  }
}



function InsrtCash(i){
let currentNumber = document.getElementById("insrt-amnt-txt");

  if(currentNumber.value==0 && i=='00'){
    currentNumber.value = '0';
  }else if(currentNumber.value==0 && i=='0'){
    currentNumber.value = '0';
  }else if(currentNumber.value=='' && i=='00'){
    currentNumber.value = '0';
  }else if(currentNumber.value.includes('.')===true && i=='.'){
    currentNumber.value = currentNumber.value;
  }else{
    if(currentNumber.value==0 && i!='0'){
      currentNumber.value = i;
    }else{
      currentNumber.value += i;
    }
  }

  if(currentNumber.value == '.'){
    currentNumber.value = '0.';
  }

  confirmPaidBtn();
}

function InsrtExactCash(){
  let totalcost = document.getElementById("total-cost").innerText;
  document.getElementById("insrt-amnt-txt").value = totalcost;
  confirmPaidBtn();
  //console.log(totalcost);
}

function InsrtCashCancel(){
  let currentNumber = document.getElementById("insrt-amnt-txt");
  currentNumber.value = '0';

  confirmPaidBtn();
}

function InsrtCashBackSpace() {
  let currentNumber = document.getElementById("insrt-amnt-txt");
  if( currentNumber.value.slice(0, -1) ){
    currentNumber.value = currentNumber.value.slice(0, -1);
  }else{
    currentNumber.value = 0;
  }

  confirmPaidBtn();
}

function denominationCash(bill){
  let currentNumber = document.getElementById("insrt-amnt-txt");
  currentNumber.value =  parseFloat(currentNumber.value) + parseFloat(bill);
  confirmPaidBtn();
}

function confirmPaidBtn(){
  document.getElementById("btn-insert-cash").disabled = true;
  let currentNumber = document.getElementById("insrt-amnt-txt");
  if(parseFloat(currentNumber.value)>=parseFloat(document.getElementById("total-cost").innerText)){
    document.getElementById("btn-insert-cash").disabled = false;
  }else{
    document.getElementById("btn-insert-cash").disabled = true;
  }

  document.getElementById('btn-insert-cash').setAttribute("data-cash", currentNumber.value);
}


function addCash(e){
  const cash = e.getAttribute("data-cash");
  const amount = document.getElementById("total-cost").innerText;
  const change = parseFloat(cash) - parseFloat(amount);

  document.getElementById("total-cash").innerText = parseFloat(cash).toFixed(2);
  document.getElementById("total-change").innerText = parseFloat(change).toFixed(2);
  enableCompleteTrans();
  disablebtn();
}

function amountRecount(){
  const amount = document.getElementById("total-cost").innerText;
  const cash = document.getElementById("total-cash").innerText;
  const change = parseFloat(cash) - parseFloat(amount);

  if(cash > 0){
    if(amount==0){
      document.getElementById("total-cash").innerText = "0.00";
      document.getElementById("total-change").innerText = "0.00";
    }else{
      document.getElementById("total-cash").innerText = parseFloat(cash).toFixed(2);
      document.getElementById("total-change").innerText = parseFloat(change).toFixed(2);
    }
  }
}


function enableCashAmount(){
  const amount = document.getElementById("total-cost").innerText;

  if(parseFloat(amount) >= 1){
    document.getElementById("btn-add-cash-amount").disabled = false;
  }else{
    document.getElementById("btn-add-cash-amount").disabled = true;
  }
}

function enableCompleteTrans(){
  let amount = document.getElementById("total-cost").innerText;
  let cash = document.getElementById("total-cash").innerText;
  let btnCash = document.getElementById("btn-add-cash-amount");

  if(parseFloat(amount).toFixed(2)!="0.00" && parseFloat(cash).toFixed(2)!="0.00"){
    document.getElementById("btn-complete-transaction").disabled = false;
  }else{
    document.getElementById("btn-complete-transaction").disabled = true;
  }  
}

function transComplete(){
  var transactionid = localStorage.getItem("transactionid");
  let orderNum = document.getElementById('order-number');
  let orderList = document.getElementById('rcpt-listing');
  let totalcash = document.getElementById('total-cash').innerText;
  let totalchange = document.getElementById('total-change').innerText;
  const zeroPad = (num, places) => String(num).padStart(places, '0');

  let sum = orderPriceArr.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue), 0);
  var vat = parseFloat(sum) * 0.12;
  var vatable = parseFloat(sum) - parseFloat(vat);

  document.getElementById('rcpt-vat').innerText = parseFloat(vat).toFixed(2);
  document.getElementById('rcpt-st-vatable').innerText = parseFloat(vatable).toFixed(2);
  document.getElementById('rcpt-total').innerText = parseFloat(sum).toFixed(2);
  document.getElementById('rcpt-cash-tendered').innerText = parseFloat(totalcash).toFixed(2);
  document.getElementById('rcpt-cash-change').innerText = parseFloat(totalchange).toFixed(2);

  let tbl = '';
  let i = 0;

  while (i < orderListArr.length) {
    var total = parseInt(orderListArr[i][2]) * parseInt(orderListArr[i][1]);
    tbl += '<div class="w-100">';
    tbl += '<div class="w-50 pull-left"><h2>'+orderListArr[i][0]+'<br>&nbsp;&nbsp;&nbsp;'+parseFloat(orderListArr[i][2]).toFixed(2)+'</h2><div class="clear"></div></div>';
    tbl += '<div class="w-25 pull-left">'+orderListArr[i][1]+'<div class="clear"></div></div>';
    tbl += '<div class="w-25 pull-left text-end">₱ '+parseFloat(total).toFixed(2)+'<div class="clear"></div></div>';
    tbl += '<div class="clear"></div></div>';
    i++;
  }
  orderList.innerHTML = tbl;

  if(transactionid){
    //console.log(transactionid);
    transID = parseInt(transactionid) + 1;
    transID = parseFloat(transactionid) + parseFloat(1);
    localStorage.setItem("transactionid", transID);
    orderNum.innerText = zeroPad(transID, 4);
  }
}


window.addEventListener("afterprint", (event) => {
  var addCartbtn = document.getElementsByClassName("keypad-num"); 
  for (var i = 0; i < addCartbtn.length; i++) { 
      addCartbtn[i].disabled = false;
  }

  var cartTrashbtn = document.getElementsByClassName("btn-trash"); 
  for (var i = 0; i < cartTrashbtn.length; i++) { 
      cartTrashbtn[i].disabled = false;
  }

  var cartClearbtn = document.getElementsByClassName("btn-clear"); 
  for (var i = 0; i < cartClearbtn.length; i++) { 
      cartClearbtn[i].disabled = false;
  }

  var itemList = document.getElementById("product-list-gelato").classList.remove("disable-items"); 
  clearCart();
  console.log("After print");
});


function setTozero(){
  document.getElementById("insrt-amnt-txt").value=0;
}

function disablebtn(){
  var addCartbtn = document.getElementsByClassName("keypad-num"); 
  for (var i = 0; i < addCartbtn.length; i++) { 
      addCartbtn[i].disabled = true;
  }

  var cartTrashbtn = document.getElementsByClassName("btn-trash"); 
  for (var i = 0; i < cartTrashbtn.length; i++) { 
      cartTrashbtn[i].disabled = true;
  }

  var cartClearbtn = document.getElementsByClassName("btn-clear"); 
  for (var i = 0; i < cartClearbtn.length; i++) { 
      cartClearbtn[i].disabled = true;
  }

  var itemList = document.getElementById("product-list-gelato").classList.add("disable-items"); 


  console.log("check");
}