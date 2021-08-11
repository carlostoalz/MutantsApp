export const isMutant = (dna: string[]) : boolean => {    
    const table = crearMatriz(dna);
    return validate(table);
}

export const validateString = (dna: string[]) => {
    const lenght = dna[0].length;
    const expression = /[ATGC]$/;

    dna.forEach((value) => {
        if(!expression.test(value))
            throw('La base nitrogenada recibida no es correcta, solo se debe llenar con : (A,T,C,G)');

        if(value.length != lenght)
            throw('Todas las secuencias de ADN deben tener el mismo tamaño');        

    });
};

const crearMatriz = (dna: string[]) : string[][] => {
    let table: string[][]= [];

    dna.forEach(adn => {
        let tempTable: string[] = [];
        for (let j = 0; j < adn.length; j++)
            tempTable.push(adn[j]);
        
        table.push(tempTable);
    });

    return table;
}

const validate = (table: string[][]) : boolean => {
    let sumSame: number = 0;
    let value: string = '';
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {            
            value = table[i][j];
            // Vertical
            if(i + 3 < table.length) 
                (value === table[i+1][j] && value === table[i+2][j] && value === table[i+3][j]) ? sumSame += 1 : sumSame += 0;            
            // Horizontal
            if(j + 3 < table[i].length)
                (value === table[i][j+1] && value === table[i][j+2] && value === table[i][j+3]) ? sumSame += 1 : sumSame += 0;            
            // Diagonal derecha
            if(i + 3 < table.length && j + 3 < table[i].length) 
                (value === table[i+1][j+1] && value === table[i+2][j+2] && value === table[i+3][j+3]) ? sumSame += 1 : sumSame += 0;
        }        
    }

    for (let i = 0; i < table.length; i++) {
        for (let j = table[i].length-1; j >= 0; j--) {
            value = table[i][j];            
            // Diagonal izquerda
            if(i + 3 < table.length && j - 3 < table[i].length) 
                (value === table[i+1][j-1] && value === table[i+2][j-2] && value === table[i+3][j-3]) ? sumSame += 1 : sumSame += 0;
        }        
    }

    return sumSame > 1 ? true : false;
}