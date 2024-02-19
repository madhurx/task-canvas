import { NextResponse } from 'next/server';

export const getErrorResponseMessage = (
    successStatus: boolean,
    message: string,
    statusCode: number,
    error?: Error,
) => {
    console.log(error?.message);
    return NextResponse.json(
        {
            success: successStatus,
            message: message,
        },
        {
            status: statusCode,
        },
    );
};
