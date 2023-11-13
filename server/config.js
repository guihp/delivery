var config = {
    dev: {
        url:'http://localhost/',
        port: 3000,
        ambiente: 'DEV',
        database: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'pizzaria'
        }
    },
}

exports.get = function get(ambiente) {

    if(ambiente.toLowerCase() === 'dev') {
        return (
            config.dev
        )
    }
} 