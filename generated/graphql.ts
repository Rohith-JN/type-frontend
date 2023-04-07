/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTest: Test;
  deleteUser: Scalars['Boolean'];
  login: FieldError;
  register: UserResponse;
  validate: FieldError;
};


export type MutationCreateTestArgs = {
  accuracy: Scalars['String'];
  chars: Scalars['String'];
  testTaken: Scalars['String'];
  time: Scalars['String'];
  uid: Scalars['String'];
  wpm: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
  uid: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: Options;
};


export type MutationValidateArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Options = {
  email: Scalars['String'];
  password: Scalars['String'];
  uid: Scalars['String'];
  username: Scalars['String'];
};

export type PaginatedTests = {
  __typename?: 'PaginatedTests';
  hasMore: Scalars['Boolean'];
  tests: Array<Test>;
};

export type Query = {
  __typename?: 'Query';
  getStats: UserStats;
  tests: PaginatedTests;
  user: UserResponse;
};


export type QueryGetStatsArgs = {
  uid: Scalars['String'];
};


export type QueryTestsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  uid: Scalars['String'];
};


export type QueryUserArgs = {
  uid: Scalars['String'];
};

export type Stats = {
  __typename?: 'Stats';
  accuracy: Scalars['String'];
  pb: Scalars['Float'];
  testsTaken: Scalars['Float'];
  time: Scalars['String'];
  wpm: Scalars['Float'];
};

export type Test = {
  __typename?: 'Test';
  accuracy: Scalars['String'];
  chars: Scalars['String'];
  createdAt: Scalars['String'];
  creatorId: Scalars['String'];
  id: Scalars['Float'];
  testTaken: Scalars['String'];
  time: Scalars['String'];
  wpm: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  uid: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserStats = {
  __typename?: 'UserStats';
  userStats: Array<Stats>;
};

export type CreateTestMutationVariables = Exact<{
  chars: Scalars['String'];
  wpm: Scalars['Float'];
  accuracy: Scalars['String'];
  time: Scalars['String'];
  uid: Scalars['String'];
  testTaken: Scalars['String'];
}>;


export type CreateTestMutation = { __typename?: 'Mutation', createTest: { __typename?: 'Test', id: number, creatorId: string, time: string, accuracy: string, wpm: number, chars: string, testTaken: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'FieldError', field?: string | null, message?: string | null } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  uid: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', error?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: number, uid: string, username: string, email: string, createdAt: string } | null } };

export type ValidateMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type ValidateMutation = { __typename?: 'Mutation', validate: { __typename?: 'FieldError', field?: string | null, message?: string | null } };

export type TestsQueryVariables = Exact<{
  uid: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type TestsQuery = { __typename?: 'Query', tests: { __typename?: 'PaginatedTests', hasMore: boolean, tests: Array<{ __typename?: 'Test', id: number, creatorId: string, time: string, accuracy: string, wpm: number, chars: string, createdAt: string, testTaken: string }> } };

export type UserQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'UserResponse', error?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: number, uid: string, username: string, email: string, createdAt: string } | null } };

export type GetStatsQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetStatsQuery = { __typename?: 'Query', getStats: { __typename?: 'UserStats', userStats: Array<{ __typename?: 'Stats', time: string, wpm: number, pb: number, accuracy: string, testsTaken: number }> } };


export const CreateTestDocument = gql`
    mutation createTest($chars: String!, $wpm: Float!, $accuracy: String!, $time: String!, $uid: String!, $testTaken: String!) {
  createTest(
    chars: $chars
    wpm: $wpm
    accuracy: $accuracy
    time: $time
    uid: $uid
    testTaken: $testTaken
  ) {
    id
    creatorId
    time
    accuracy
    wpm
    chars
    testTaken
  }
}
    `;

export function useCreateTestMutation() {
  return Urql.useMutation<CreateTestMutation, CreateTestMutationVariables>(CreateTestDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    field
    message
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $uid: String!) {
  register(
    options: {username: $username, email: $email, password: $password, uid: $uid}
  ) {
    error {
      field
      message
    }
    user {
      id
      uid
      username
      email
      createdAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ValidateDocument = gql`
    mutation Validate($username: String!, $email: String!, $password: String!) {
  validate(username: $username, email: $email, password: $password) {
    field
    message
  }
}
    `;

export function useValidateMutation() {
  return Urql.useMutation<ValidateMutation, ValidateMutationVariables>(ValidateDocument);
};
export const TestsDocument = gql`
    query Tests($uid: String!, $limit: Int!, $cursor: String) {
  tests(uid: $uid, limit: $limit, cursor: $cursor) {
    tests {
      id
      creatorId
      time
      accuracy
      wpm
      chars
      createdAt
      testTaken
    }
    hasMore
  }
}
    `;

export function useTestsQuery(options: Omit<Urql.UseQueryArgs<TestsQueryVariables>, 'query'>) {
  return Urql.useQuery<TestsQuery, TestsQueryVariables>({ query: TestsDocument, ...options });
};
export const UserDocument = gql`
    query User($uid: String!) {
  user(uid: $uid) {
    error {
      field
      message
    }
    user {
      id
      uid
      username
      email
      createdAt
    }
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};
export const GetStatsDocument = gql`
    query GetStats($uid: String!) {
  getStats(uid: $uid) {
    userStats {
      time
      wpm
      pb
      accuracy
      testsTaken
    }
  }
}
    `;

export function useGetStatsQuery(options: Omit<Urql.UseQueryArgs<GetStatsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStatsQuery, GetStatsQueryVariables>({ query: GetStatsDocument, ...options });
};