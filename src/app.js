const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// mostra mensagem de erro
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const small = formControl.querySelector("small");
  small.innerText = message;
};

// verifica se o e-mail eh valido
const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid')
  }
};

// mostra realce de sucesso
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

// verifica obrigatoriedade dos campos
function checkRequired(inputArr){
  inputArr.forEach((input) => {
    if(input.value.trim() === ''){
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// verifica quantidade de caracteres nos campos
function checkLength(input, min, max){
  if(input.value.length < min){
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`)
  } else {
    showSuccess(input);
  }
}

// verifica que os valores de ambos campos de senhas sao iguais
function checjPasswordsMatch(input1, input2){
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match')
  }
}

// pega nome do campo pela id
function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); // faz a primeira letra da id ficar maiuscula
  // recorta a primeira letra e a deixa maiuscula; depois junta com o resta da id, a partir da segunda letra
}

// event listeners para validacao dos campos do formulario
form.addEventListener("submit", e => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3 , 15);
  checkLength(password, 6 , 25);
  checkEmail(email); // verifica validade do email, usando a variavel de email definida no inicio deste documento
  checjPasswordsMatch(password, password2)
});
