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
const isValidEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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
      showError(input, `${getFieldName(input)} é obrigatório`);
    } else {
      showSuccess(input);
    }
  });
}

// pega nome do campo pela id
function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); // faz a primeira letra da id ficar maiuscula
  // recorta a primeira letra e a deixa maiuscula; depois junta com o resta da id, a partir da segunda letra
}

// event listeners
form.addEventListener("submit", e => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
});
