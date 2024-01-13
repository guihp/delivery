const AcessoDados = require('../db/acessodados');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql');
const readCommandSql = new ReadCommandSql();
const UsuarioAcessoToken = require('../common/protecaoAcesso');
const Acesso = new UsuarioAcessoToken();

const controllers = () => {

    const login = async (req) => {
        
        var password = req.body.senha;

        // validar se o usuário existe no banco de dados
        var ComandoSql = await readCommandSql.restornaStringSql('login', 'login');
        var usuarioBanco = await db.Query(ComandoSql, req.body);

        if (usuarioBanco != undefined && usuarioBanco.length > 0) {
            // existe o usuário no banco

            // validar se as senhas são iguais

            // se tiver tudo ok, gera o token e retorna o JSON

        }
        else {
            return {
                status: 'error',
                message: "Usuário ou senha incorretos." // Usuário não cadastrado no sistema
            }
        }

    };

    return Object.create({
        login
    })

}

module.exports = Object.assign({ controllers })