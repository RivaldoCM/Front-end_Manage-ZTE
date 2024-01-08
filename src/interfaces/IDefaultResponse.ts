export type IResponseData = {
    success: true;
    messages: null;
    responses: {
        status: string | null;
        response: string | number | Object | any[] | undefined;
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