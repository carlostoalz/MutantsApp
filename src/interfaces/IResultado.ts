import { IError } from './IError';

export interface IResultado<T> {
    datos: T;
    exitoso: boolean;
    status: number;
    mensajeUsuario: string;
    error: IError | null;
}