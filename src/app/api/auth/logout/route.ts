import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const response = NextResponse.json({message: "Logout Bem Sucedido"})
    response.cookies.set('barberToken', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 0,
        path: '/'
    })

    return response
}