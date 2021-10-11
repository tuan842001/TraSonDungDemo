// var dangnhap = document.querySelector(".login-form-container");
// function xemKetQua() {
//   dangnhap.classList.toggle("active");
// }

let languageForm = document.querySelector('.language-form-container');

document.querySelector('#language-btn').onclick = () =>{
  languageForm.classList.toggle('active');
}


let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

// document.querySelector('#close-login-btn').onclick = () =>{
//   loginForm.classList.remove('active');
// }

