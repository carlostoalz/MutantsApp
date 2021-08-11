import { Error } from '../types/Error';
import { BaseError } from 'make-error'
import { ValidationError } from 'express-validator';

export const handleError = (error: BaseError | ValidationError[] | string) : Error => {

    let wError: Error = new Error();

    if(!error) {
        return wError;
    }
    
    if((<BaseError>error)){

        if((<BaseError>error).message) {
            wError.mensaje = (<BaseError>error).message;
        }
    
        if((<BaseError>error).stack) {
            wError.pila = (<BaseError>error).stack;
        }
        
        if (wError.mensaje && wError.mensaje.trim() !== "") {
            return wError;
        }
    }

    if ( Array.isArray(error) && (<ValidationError[]>error).length > 0) {
        wError.mensaje = (<ValidationError[]>error).map( (ve: ValidationError) => ve.msg ).join(', ');
        if (wError.mensaje && wError.mensaje.trim() !== "") {
            return wError;
        }
    }

    if ((<string>error).trim() !== "") {
        wError.mensaje = (<string>error).trim();
        return wError;
    }
};