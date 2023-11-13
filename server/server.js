global.config = require('./config').get('dev');

/*aqui esta puxando as dependencias do node.js*/ 

const restify = require("restify");
const path = require("path");
const recursiveReaddir = require("recursive-readdir");


/*aqui esta criando o servidor*/
const server = restify.createServer({
    name: 'Delivery',
    version: '1.0.0'
});

// adiciona as extenseões do rerstify para o funcionamento do JSON nas rerquisiçoes 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.urlEncodedBodyParser());


// adiciona todas as rotas dentro da inicialiazação do server (para executrar as rotas da pasta 'routes')
const pathFiles = path.resolve(path.resolve('./').concat('/server/routes'));

recursiveReaddir(pathFiles, ['!*.js'], (err, files) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    files.forEach(element => { require(element)(server) })
});

// utilizado para não da problema com requisições no chrome (CORS)
server.use(
    function nocache(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Pragma", "no-cache");
        next();
    }
)
// modifica o array de erro e mostra pro usuario uma pensagem personalizada
server.on('restifyError', (req, res, err, callback) => {
    err.toJSON = function customToJSON() {
        return {
            Erro: 'Página não encontrada :/'
        }
    };
    return callback();
});

module.exports = Object.assign({ server, restify, config })