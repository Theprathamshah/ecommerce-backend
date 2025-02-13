export class errorMessage {
    constructor(error: error) {}    
}

interface error {
    statusCode: number;
    message: string;
}