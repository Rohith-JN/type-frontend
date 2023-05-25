import cookie from "cookie";
import { NextPageContext } from "next";

export async function getTheme(context: NextPageContext) {
    const data = cookie.parse(
        context.req ? context.req.headers.cookie || "" : document.cookie
    );

    return { props: { themeData: data } };
}
