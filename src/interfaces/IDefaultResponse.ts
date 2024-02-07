export type IResponseData = {
    success: true;
    messages: null;
    responses: {
        status: string | null;
        response: any;
    };
}

export type IResponseError = {
    success: false;
    messages: {
        message: string;
        response: null | undefined;
        type: string;
    };
    response: null;
}