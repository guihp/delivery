document.addEventListener("DOMContentLoaded", (event) => {

    login.event.init()

});


var login = {};

login.event = {

    init: () => {
      
        document.querySelector("#btnLogin").addEventListener("click", () => {
            login.method.validarLogin();
        });

    }

}

login.method = {

    // aqui vai validar se os campos de login estão prenchidos
    validarLogin: () => {

        let email = document.querySelector("#txtEmailLogin").value.trim();
        let senha = document.querySelector("#txtSenhaLogin").value.trim();


        if (email.length == 0) {
            alert("Informe o e-mail, por favor!")
            document.querySelector("#txtEmailLogin").focus();
            return;
        }

        if (senha.length == 0) {
            alert("Informe a senha, por favor!")
            document.querySelector("#txtSenhaLogin").focus();
            return;
        }


        login.method.login(email, senha)

    },

// aqui o metodo que vai validar o login (via api)
    login: (email, senha) => {

        var dados = {
            email: email,
            senha: senha
        }

        app.method.post('/login', JSON.stringify(dados), 
        (response) => {
            console.log(response)
        }, 
        (error) => {
            console.log(error)
        }, true
        )

    },


}