const controllers = () => {

    const login = async (req) => {
        return {retorno: "OK"}
    };

    return Object.create({
        login
    })
    
}

module.exports = Object.assign({ controllers })