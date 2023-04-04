/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation createTest($chars: String!, $wpm: Float!, $accuracy: String!, $time: String!, $uid: String!) {\n  createTest(\n    chars: $chars\n    wpm: $wpm\n    accuracy: $accuracy\n    time: $time\n    uid: $uid\n  ) {\n    id\n    creatorId\n    time\n    accuracy\n    wpm\n    chars\n  }\n}": types.CreateTestDocument,
    "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    field\n    message\n  }\n}": types.LoginDocument,
    "mutation Register($username: String!, $email: String!, $password: String!, $uid: String!) {\n  register(\n    options: {username: $username, email: $email, password: $password, uid: $uid}\n  ) {\n    error {\n      field\n      message\n    }\n    user {\n      id\n      uid\n      username\n      email\n      createdAt\n    }\n  }\n}": types.RegisterDocument,
    "mutation User($uid: String!) {\n  user(uid: $uid) {\n    error {\n      field\n      message\n    }\n    user {\n      id\n      uid\n      username\n      email\n      createdAt\n    }\n  }\n}": types.UserDocument,
    "mutation Validate($username: String!, $email: String!, $password: String!) {\n  validate(username: $username, email: $email, password: $password) {\n    field\n    message\n  }\n}": types.ValidateDocument,
    "query Tests($uid: String!, $limit: Int!, $cursor: String) {\n  tests(uid: $uid, limit: $limit, cursor: $cursor) {\n    id\n    creatorId\n    time\n    accuracy\n    wpm\n    chars\n    createdAt\n  }\n}": types.TestsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createTest($chars: String!, $wpm: Float!, $accuracy: String!, $time: String!, $uid: String!) {\n  createTest(\n    chars: $chars\n    wpm: $wpm\n    accuracy: $accuracy\n    time: $time\n    uid: $uid\n  ) {\n    id\n    creatorId\n    time\n    accuracy\n    wpm\n    chars\n  }\n}"): (typeof documents)["mutation createTest($chars: String!, $wpm: Float!, $accuracy: String!, $time: String!, $uid: String!) {\n  createTest(\n    chars: $chars\n    wpm: $wpm\n    accuracy: $accuracy\n    time: $time\n    uid: $uid\n  ) {\n    id\n    creatorId\n    time\n    accuracy\n    wpm\n    chars\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    field\n    message\n  }\n}"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    field\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($username: String!, $email: String!, $password: String!, $uid: String!) {\n  register(\n    options: {username: $username, email: $email, password: $password, uid: $uid}\n  ) {\n    error {\n      field\n      message\n    }\n    user {\n      id\n      uid\n      username\n      email\n      createdAt\n    }\n  }\n}"): (typeof documents)["mutation Register($username: String!, $email: String!, $password: String!, $uid: String!) {\n  register(\n    options: {username: $username, email: $email, password: $password, uid: $uid}\n  ) {\n    error {\n      field\n      message\n    }\n    user {\n      id\n      uid\n      username\n      email\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation User($uid: String!) {\n  user(uid: $uid) {\n    error {\n      field\n      message\n    }\n    user {\n      id\n      uid\n      username\n      email\n      createdAt\n    }\n  }\n}"): (typeof documents)["mutation User($uid: String!) {\n  user(uid: $uid) {\n    error {\n      field\n      message\n    }\n    user {\n      id\n      uid\n      username\n      email\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Validate($username: String!, $email: String!, $password: String!) {\n  validate(username: $username, email: $email, password: $password) {\n    field\n    message\n  }\n}"): (typeof documents)["mutation Validate($username: String!, $email: String!, $password: String!) {\n  validate(username: $username, email: $email, password: $password) {\n    field\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Tests($uid: String!, $limit: Int!, $cursor: String) {\n  tests(uid: $uid, limit: $limit, cursor: $cursor) {\n    id\n    creatorId\n    time\n    accuracy\n    wpm\n    chars\n    createdAt\n  }\n}"): (typeof documents)["query Tests($uid: String!, $limit: Int!, $cursor: String) {\n  tests(uid: $uid, limit: $limit, cursor: $cursor) {\n    id\n    creatorId\n    time\n    accuracy\n    wpm\n    chars\n    createdAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;