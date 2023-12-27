currentTime();
showGelato();
showUser();
generateTransID();
checkadmin();
currentDate();
userInfo();

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Time
function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";
      
  if(hh > 12){
    session = "PM";
  }

  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;
  //let time = hh + ":" + mm + ":" + ss;

  if(document.getElementById("clock")){
    document.getElementById("clock").innerText = time; 

    if(document.getElementById("rcpt-timestamp")){
      document.getElementById("rcpt-timestamp").innerText = time;
    }

    let t = setTimeout(function(){ currentTime() }, 1000); 
  }
}

function currentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = mm + '/' + dd + '/' + yyyy;

  if(document.getElementById('rcpt-date')){
    document.getElementById('rcpt-date').innerText = formattedToday;
  }
  if(document.getElementById('header-date')){
    document.getElementById('header-date').innerText = formattedToday;
  }

}

function showGelato(){
  //console.log("show gelato function - test");

  // Fetch JSON data
  fetch('./js/json/products.json')
    .then(response => response.json())
    .then(data => {
      // Access the 'gelato' array from the JSON data
      const gelatoProducts = data.gelato;

      // Get the HTML element to display products
      const productList = document.getElementById('product-list-gelato');

      let productHTML = '';

      gelatoProducts.forEach(product => {     
      
        const formattedCone = parseFloat(product.cone).toFixed(2);
        const formattedCup = parseFloat(product.cup).toFixed(2);

        // Create HTML string for each product
        productHTML += '<div class="col position-relative">';
        productHTML += '<div class="card position-relative" onclick="passData(this)" data-bs-toggle="modal" data-bs-target="#order-modal" data-item="'+product.item_name+'" data-cp-price="'+product.cup+'" data-cn-price="'+product.cone+'" data-img="./image/gelato/'+product.img+'">';
        
        if(product.best_seller == 'y'){
          productHTML += '<span class="best-seller-badge" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Best Seller"><i class="bi bi-patch-check-fill"></i></span>';
        }

        productHTML += '<img src="./image/gelato/'+product.img+'" class="card-img-top" alt="'+product.item_name+'">';
        productHTML += '<div class="card-footer">';
        productHTML += '<h5 class="card-title text-truncate">'+product.item_name+'</h5>';
          productHTML += '<div class="card-text">';
          productHTML += '<ul class="list-unstyled mb-0">';
            productHTML += '<li class="d-flex justify-content-between align-items-center"><span>Cup:</span><span>₱ '+formattedCup+'</span></li>';
            productHTML += '<li class="d-flex justify-content-between align-items-center"><span>Cone:</span><span>₱ '+formattedCone+'</span></li>';
          productHTML += '</ul>';
          productHTML += '</div>'; // End Card Text
 
        productHTML += '</div>'; // End Card Footer
        productHTML += '</div>'; // End Card

        if(product.allergens == 'y'){
          productHTML += '<button type="button" style="" class="btn-card-float btn btn-secondary btn-warning" data-bs-toggle="popover" title="Allergens" data-bs-content="Contains Peanuts and Hazelnuts"><i class="fa-solid fa-triangle-exclamation"></i></button>';
        }

        productHTML += '</div>';
      });

      productList.innerHTML = productHTML;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


/* Side navigation */ 
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),

  modeText = body.querySelector(".mode-text");
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });


function showUser(){
  const currentUser = sessionStorage.getItem('currentUser');
  if (currentUser) {
    const parsedArray = JSON.parse(currentUser);

    if(document.getElementById('currentUser-name')){
      document.getElementById('currentUser-name').innerText = parsedArray[0]['name'];
    }
    if(document.getElementById('rcpt-user')) {
      document.getElementById('rcpt-user').innerText = parsedArray[0]['name'];
    }
    
    //document.getElementById('dashboard-name').innerText = parsedArray[0]['name'] + " " + parsedArray[0]['lastname'];

    generateImage(parsedArray[0]['name'], parsedArray[0]['lastname']);

  } else {
    console.log('No data found in sessionStorage.');
  }
  
}

function generateImage(firstName, lastName) {
  // Get the first letters of the first name and last name
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 100; // Set canvas width
  canvas.height = 100; // Set canvas height

  // Get the drawing context
  const ctx = canvas.getContext('2d');

  // Set background color (optional)
  ctx.fillStyle = '#f0f0f0'; // Set background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = '48px Arial'; // Set font size and family
  ctx.fillStyle = '#333'; // Set text color
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw initials on the canvas
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  // Convert the canvas to an image URL
  const imageURL = canvas.toDataURL(); // Get data URL of the canvas

  // Get the existing image element by ID
  const userImage = document.getElementById('userImage');

  // Set the generated image URL as the source for the existing image element
  userImage.src = imageURL;
}

function generateTransID(){
  //window.localStorage.removeItem('transactionid');
  //var transactionid = '';
  var transactionid = localStorage.getItem("transactionid");
  let orderNum = document.getElementById('order-number');
  let orderTNum = document.getElementById('rcpt-transnum');
  const zeroPad = (num, places) => String(num).padStart(places, '0');

  let transID = '';
  if(transactionid){
    transID = parseFloat(transactionid);
  }else{
    transID = 1;
    localStorage.setItem("transactionid", transID);
  }

  if(orderNum){
    orderNum.innerText = zeroPad(transID, 4);
    orderTNum.innerText = zeroPad(transID, 4);
  }
}

function logout(){
  sessionStorage.clear();
  window.location.href = "../index.html";
  console.log("logout");
}

function checkadmin(){
  const currentUser = sessionStorage.getItem('currentUser');
  if (currentUser) {
    const parsedArray = JSON.parse(currentUser);
    
    if(parsedArray[0]['authority']==1){
      document.getElementById("admin-only").style.display = 'block';
    }else{
      document.getElementById("admin-only").style.display = 'none';
    }

    //console.log(parsedArray[0]['authority']);

  } else {
    console.log('No data found in sessionStorage.');
  }
}


function userInfo(){
  const currentUser = sessionStorage.getItem('currentUser');
  const parsedArray = JSON.parse(currentUser);
  let employeeDetails = document.getElementById('employee-details');

  let ed = '';
  let auth = '';

  if(parsedArray[0]['authority']==1){
    auth = "Administrator";
  }else{
    auth = "Cashier";
  }

  ed = '<li><span class="fw-bold">Employee ID:</span> <span>'+ parsedArray[0]['employeeid'] +'</span></li>';
  ed += '<li><span class="fw-bold">Name:</span> <span class="text-capitalize">'+ parsedArray[0]['name'] + ' ' + parsedArray[0]['lastname'] + '</span></li>';
  ed += '<li><span class="fw-bold">Role:</span> <span>'+ auth +'</span></li>';

  if(employeeDetails){
    employeeDetails.innerHTML = ed;
  }
}
