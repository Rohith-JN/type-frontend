import cookie from "cookie";
import { NextPageContext } from "next";

export async function getTheme(context: NextPageContext) {
    const data = cookie.parse(
        context.req ? context.req.headers.cookie || "" : document.cookie
    );

    if (context.res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            context.res.end();
            return { props: {} };
        }
    }

    return { props: { themeData: data } };
}
