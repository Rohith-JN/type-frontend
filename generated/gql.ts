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
    "fragment RegularError on FieldError {\n  field\n  message\n}": types.RegularErrorFragmentDoc,
    "fragment RegularUser on User {\n  id\n  uid\n  username\n  email\n  createdAt\n}": types.RegularUserFragmentDoc,
    "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    ...RegularError\n  }\n}": types.LoginDocument,
    "mutation Register($username: String!, $email: String!, $password: String!, $uid: String!) {\n  register(\n    options: {username: $username, email: $email, password: $password, uid: $uid}\n  ) {\n    error {\n      ...RegularError\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}": types.RegisterDocument,
    "mutation User($uid: String!) {\n  user(uid: $uid) {\n    error {\n      ...RegularError\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}": types.UserDocument,
    "mutation Validate($username: String!, $email: String!, $password: String!) {\n  validate(username: $username, email: $email, password: $password) {\n    ...RegularError\n  }\n}": types.ValidateDocument,
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
export function graphql(source: "fragment RegularError on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment RegularError on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUser on User {\n  id\n  uid\n  username\n  email\n  createdAt\n}"): (typeof documents)["fragment RegularUser on User {\n  id\n  uid\n  username\n  email\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    ...RegularError\n  }\n}"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    ...RegularError\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($username: String!, $email: String!, $password: String!, $uid: String!) {\n  register(\n    options: {username: $username, email: $email, password: $password, uid: $uid}\n  ) {\n    error {\n      ...RegularError\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"): (typeof documents)["mutation Register($username: String!, $email: String!, $password: String!, $uid: String!) {\n  register(\n    options: {username: $username, email: $email, password: $password, uid: $uid}\n  ) {\n    error {\n      ...RegularError\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation User($uid: String!) {\n  user(uid: $uid) {\n    error {\n      ...RegularError\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"): (typeof documents)["mutation User($uid: String!) {\n  user(uid: $uid) {\n    error {\n      ...RegularError\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Validate($username: String!, $email: String!, $password: String!) {\n  validate(username: $username, email: $email, password: $password) {\n    ...RegularError\n  }\n}"): (typeof documents)["mutation Validate($username: String!, $email: String!, $password: String!) {\n  validate(username: $username, email: $email, password: $password) {\n    ...RegularError\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;