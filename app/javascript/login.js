function gestLogIn(){
  const path = location.pathname;
  if(path === "/users/sign_in"){
    const gest = document.getElementById("gest-login");
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");
    const submit = document.getElementById("login-submit");
    gest.addEventListener("click", (e) => {
      email.value = "test@gmail.com";
      password.value = "testtest";
      submit.click();
    });
  }
}
window.addEventListener("load", gestLogIn);