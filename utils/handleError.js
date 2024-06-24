
const handleHttpError = (res, code, error) => {    
    res.status(code);
    res.json({message:error})
}

const handleErrorNoFile = (res, error) => {
    code = 404
    res.status(code);
    res.json({message:error})
}



module.exports = {handleHttpError,handleErrorNoFile};