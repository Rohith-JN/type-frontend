import { useCallback, useEffect, useState } from "react";
import { gql, useClient } from "urql";
import { useAuth } from "../firebase/auth";

const paginatedTestQuery = gql`
    query paginatedTests($uid: String!, $first: Int!, $after: String) {
        paginatedTests(uid: $uid, first: $first, after: $after) {
            tests {
                id
                creatorId
                time
                accuracy
                wpm
                rawWpm
                chars
                createdAt
                testTaken
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`;

export const usePaginatedTestsQuery = () => {
    const { authUser } = useAuth();
    const uid = authUser ? authUser["uid"] : "";
    const [paginatedTests, setPaginatedTests] = useState<any[]>([]);
    const [paginatedTestsError, setpaginatedTestsError] =
        useState<boolean>(false);
    const [paginatedTestsFetching, setpaginatedTestsFetching] =
        useState<boolean>(false);
    const [endCursor, setEndCursor] = useState<string | null>(null);
    const graphqlClient = useClient();
    const loadMore = useCallback(() => {
        if (!endCursor) {
            return;
        }
        graphqlClient
            .query(paginatedTestQuery, { uid, first: 10, after: endCursor })
            .toPromise()
            .then((nextResult) => {
                setpaginatedTestsFetching(true);
                const { tests: newTests, pageInfo } =
                    nextResult.data.paginatedTests;
                setPaginatedTests((oldTests) => [...oldTests, ...newTests]);
                setEndCursor(pageInfo.endCursor);
                setpaginatedTestsFetching(false);
                setpaginatedTestsError(false);
            })
            .catch((_) => {
                setpaginatedTestsFetching(false);
                setpaginatedTestsError(true);
            });
    }, [endCursor, paginatedTestQuery]);

    useEffect(() => {
        graphqlClient
            .query(paginatedTestQuery, { uid, first: 10 })
            .toPromise()
            .then((result) => {
                setpaginatedTestsFetching(true);
                const { tests: newTests, pageInfo } =
                    result.data.paginatedTests;
                setPaginatedTests(newTests);
                setEndCursor(pageInfo.endCursor);
                setpaginatedTestsFetching(false);
                setpaginatedTestsError(false);
            })
            .catch((_) => {
                setpaginatedTestsFetching(false);
                setpaginatedTestsError(true);
            });
    }, [graphqlClient, paginatedTestQuery, uid]);

    return {
        paginatedTests,
        paginatedTestsFetching,
        paginatedTestsError,
        loadMore,
    };
};
