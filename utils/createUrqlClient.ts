import { dedupExchange, fetchExchange } from "urql";

export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:4000/graphql",
    exchanges: [ssrExchange, dedupExchange, fetchExchange],
});
