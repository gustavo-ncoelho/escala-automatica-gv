export class ServerActionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ServerActionError";
    }
}

export class UnauthenticatedError extends Error {
    constructor() {
        super("Usuário não autenticado.");
        this.name = "UnauthenticatedError";
    }
}

export class HttpError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
    ) {
        super("HttpError.");
        this.name = "HttpError";
    }
}