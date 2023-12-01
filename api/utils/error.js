 export const errorHandler=(statusCode, message)=>{
    const error =new Error()
    error.statusCode=statusCode
    error.message=message
    error.message1='from error handler util'
    return error
}