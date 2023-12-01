var app = {};

app.event = {

}

app.method = {

    // centraliza as chamadas de GET
    get: (url, callbackSuccess, callbackError, login = false) => {

        try {

            if (app.method.validaToken(login)) {

                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                xhr.setRequestHeader("Authorization", app.method.obterValorStorage('token'));

                xhr.onreadystatechange = function () {
                    
                    if (this.readyState == 4) {

                        if (this.status == 200) {
                            return callbackSuccess(JSON.parse(xhr.responseText))
                        }
                        else {

                            // se o retorno for não autorizado, redireciona o usuário para o login
                            if (xhr.status == 401) {
                                app.method.logout();
                            }

                            return callbackError(xhr.responseText);

                        }

                    }

                }

                xhr.send();

            }
            
        } catch (error) {
            return callbackError(error)
        }

    },

    // centraliza as chamadas de POST
    post: (url, dados, callbackSuccess, callbackError, login = false) => {

        try {

            if (app.method.validaToken(login)) {

                let xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                xhr.setRequestHeader("Authorization", app.method.obterValorStorage('token'));

                xhr.onreadystatechange = function () {
                    
                    if (this.readyState == 4) {

                        if (this.status == 200) {
                            return callbackSuccess(JSON.parse(xhr.responseText))
                        }
                        else {

                            // se o retorno for não autorizado, redireciona o usuário para o login
                            if (xhr.status == 401) {
                                app.method.logout();
                            }

                            return callbackError(xhr.responseText);

                        }

                    }

                }

                xhr.send(dados);

            }
            
        } catch (error) {
            return callbackError(error)
        }

    },

    // método para validar se o token existe (local). É chamado em todas as requisições
    validaToken: (login = false) => {

        var tokenAtual = app.method.obterValorStorage('token');

        if ((tokenAtual == undefined || tokenAtual == null || tokenAtual == "" || tokenAtual == "null") && !login) {
            window.location.href = '/painel/login.html';
            return false;
        }

        return true;

    },

    // grava valores no localstorage
    gravarValorStorage: (valor, local) => {
        localStorage[local] = valor;
    },

    // obtem um valor do localstorage
    obterValorStorage: (local) => {
        return localStorage[local];
    },

    // método que limpa todo o localstorage e redireciona pro login
    logout: () =>{
        localStorage.clear();
        window.location.href = '/painel/login.html';
    }

}