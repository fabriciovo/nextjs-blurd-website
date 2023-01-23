import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequest) {
        // return NextResponse
        return NextResponse.rewrite(new URL("/user", req.url));
    },
    {
        callbacks: {
            authorized({ token }) {
                console.log(token)
                if(token?.accessToken !== undefined) return true
                return false;
            },
        },
    }
);

export const config = { matcher: ["/user"] };
