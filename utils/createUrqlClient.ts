import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import { fetchExchange, createClient, Client } from "urql";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { __prod__ } from "./constants";

function invalidateQuery(cache: Cache, field: string) {
    const allFields = cache.inspectFields("Query");
    const fieldInfos = allFields.filter((info) => info.fieldName === field);
    fieldInfos.forEach((fi) => {
        cache.invalidate("Query", field, fi.arguments || {});
    });
}

export const urqlClient: Client = createClient({
    url: __prod__ ? process.env.BACKEND_URL! : "http://localhost:4000/graphql",
    exchanges: [
        fetchExchange,
        cacheExchange({
            resolvers: {
                Query: {
                    paginatedTests: relayPagination(),
                },
            },
            updates: {
                Mutation: {
                    createTest: (_result, _args, cache, _info) => {
                        invalidateQuery(cache, "tests");
                        invalidateQuery(cache, "paginatedTests");
                        invalidateQuery(cache, "leaderboard");
                    },
                    login: (_result, _args, cache, _info) => {
                        invalidateQuery(cache, "tests");
                        invalidateQuery(cache, "paginatedTests");
                        invalidateQuery(cache, "leaderboard");
                    },
                },
            },
        }),
    ],
});
