import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { relayPagination } from "@urql/exchange-graphcache/extras";

export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:4000/graphql",
    exchanges: [
        ssrExchange,
        dedupExchange,
        fetchExchange,
        cacheExchange({
            resolvers: {
                Query: {
                    paginatedTests: relayPagination(),
                },
            },
        }),
    ],
});
