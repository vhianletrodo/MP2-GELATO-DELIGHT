document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  console.log('Clicked');

  /* Authority 
   * 1 = admin
   * 0 = cashier
   */

  const userArr = [
      {
        "employeeid" : "wd92p-001",
        "name" : "vivian",
        "lastname" : "letrodo",
        "password" : "vivianl123",
        "authority" : "1",
      },
      {
        "employeeid" : "wd92p-002",
        "name" : "isaiah",
        "lastname" : "severino",
        "password" : "isaiahs123",
        "authority" : "1",
      },
      {
        "employeeid" : "wd92p-003",
        "name" : "jamie",
        "lastname" : "delina",
        "password" : "jamied123",
        "authority" : "1",
      },
      {
        "employeeid" : "wd92p-004",
        "name" : "cashier",
        "lastname" : "here",
        "password" : "cashier123",
        "authority" : "0",
      },
    ];

  console.log(userArr);


  // Retrieve the existing userArr from localStorage
  const localStorageUser = JSON.parse( localStorage.getItem('localUsers') );
  let userArray = '';
  if(localStorageUser){
    userArray = userArr.concat(localStorageUser);
  }else{
    userArray = userArr;
  }

  console.log(userArray);

  const errorRes = document.getElementById('error-response');
  const employeeid = document.getElementById('employeeid').value;
  const password = document.getElementById('password').value;

  for (i = 0; i < userArray.length; i++) {
    if(userArray[i]['employeeid']==employeeid && userArray[i]['password']==password){
      console.log('loggin successfully');

      const currentUser = [{ 
        "employeeid" : userArray[i]['employeeid'],
        "name" : userArray[i]['name'],
        "lastname" : userArray[i]['lastname'],
        "authority" : userArray[i]['authority'],
        "isloggedin" : "1"
      }];

      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      errorRes.innerHTML = "";
      
      //window.location.href = "#";
      window.location.href = "./admin/index.html";

      break;

    }else{
      console.log('loggin failed');
      document.getElementById('employeeid').value = '';
      document.getElementById('password').value = '';
      errorRes.innerHTML = "<div class='error-text'>Login failed. Please check your credentials and try&nbsp;again.</div>";
    }
  } 
});


const inputIcon = document.querySelector(".input-icon");
inputIcon.addEventListener("click", showPassword);

function showPassword() {
  const input = document.querySelector("#password");
  const eyeIcon = document.querySelector(".input-icon i");

  if (input.type === "password") {
    input.type = "text";
    eyeIcon.className = "fas fa-eye-slash";
  } else {
    input.type = "password";
    eyeIcon.className = "fas fa-eye";
  }
}