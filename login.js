document.getElementById('login-btn').addEventListener("click" , function(){
  const inputUser = document.getElementById('input-user')
  const inputPassword = document.getElementById('input-password')
  inputPassword.innerText = ""

  if (inputUser.value == "admin" && inputPassword.value == "admin123"){
    alert('login successful');
    window.location.assign("./home.html");
  }

  else{
    alert('Login Failed');
    return;
  }




})