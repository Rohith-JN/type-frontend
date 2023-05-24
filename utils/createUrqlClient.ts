import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { __prod__ } from "./constants";

function invalidateQuery(cache: Cache, field: string) {
    const allFields = cache.inspectFields("Query");
    const fieldInfos = allFields.filter((info) => info.fieldName === field);
    fieldInfos.forEach((fi) => {
        cache.invalidate("Query", field, fi.arguments || {});
    });
}

export const createUrqlClient = (ssrExchange: any) => ({
    url: __prod__
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : "http://localhost:4000/graphql",
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
            updates: {
                Mutation: {
                    createTest: (_result, args, cache, info) => {
                        invalidateQuery(cache, "tests");
                        invalidateQuery(cache, "paginatedTests");
                        invalidateQuery(cache, "leaderboard");
                    },
                    login: (_result, args, cache, info) => {
                        invalidateQuery(cache, "tests");
                        invalidateQuery(cache, "paginatedTests");
                        invalidateQuery(cache, "leaderboard");
                    },
                },
            },
        }),
    ],
});
