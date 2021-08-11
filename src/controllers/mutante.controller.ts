import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Document } from 'mongoose';
import { RSV } from "../types/Resultado";
import { handleError } from '../common/HandleError';
import { validateString, isMutant } from '../logic/adnBL';
import CadenaADN from '../models/CadenaADN.model';
import { IStats } from "../interfaces/IStats";

let statusCode: number = 0;

export const validarADN = async (req: Request<{ dna: string[] }>, res: Response<RSV<Document>>) => {

    let infoResultado: RSV<Document> = new RSV<Document>();

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).send()
            statusCode = 400;
            throw errors.array();
        }

        validateString(req.body.dna);
        const is_mutant = isMutant(req.body.dna);

        const cadenaADN = new CadenaADN({
            dna: req.body.dna,
            isMutant: is_mutant
        });

        infoResultado.datos = await cadenaADN.save();

        if(is_mutant) {
            infoResultado.status = 200;
            infoResultado.mensajeUsuario = 'Es Mutante';
        } else {
            infoResultado.status = 403;
            infoResultado.mensajeUsuario = 'Es Humano';
        }
        infoResultado.exitoso = true;
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);
};

export const mutantStats = async (req: Request, res: Response<RSV<IStats>>) => {
    let infoResultado: RSV<IStats> = new RSV<IStats>();

    try {

        const count_mutant_dna = await CadenaADN.find({ isMutant: true }).count();
        const count_human_dna = await CadenaADN.find({ isMutant: false }).count();
        const ratio = count_mutant_dna > 0 ? count_human_dna / count_mutant_dna : 0;

        infoResultado.datos = {
            count_mutant_dna,
            count_human_dna,
            ratio
        };

        infoResultado.exitoso = true;
        infoResultado.status = 200;
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);
};