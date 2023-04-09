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

export type LeaderBoard = {
  __typename?: 'LeaderBoard';
  leaderBoard: Array<LeaderBoardStatFields>;
};

export type LeaderBoardStatFields = {
  __typename?: 'LeaderBoardStatFields';
  accuracy: Scalars['String'];
  rank: Scalars['Float'];
  testTaken: Scalars['String'];
  time: Scalars['String'];
  user: Scalars['String'];
  wpm: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTest: Test;
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

export type Query = {
  __typename?: 'Query';
  getStats: UserStats;
  leaderboard: LeaderBoard;
  tests: Array<Test>;
  user: UserResponse;
};


export type QueryGetStatsArgs = {
  uid: Scalars['String'];
};


export type QueryLeaderboardArgs = {
  time: Scalars['String'];
};


export type QueryTestsArgs = {
  uid: Scalars['String'];
};


export type QueryUserArgs = {
  uid: Scalars['String'];
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

export type UserStatFields = {
  __typename?: 'UserStatFields';
  accuracy: Scalars['String'];
  pb: Scalars['Float'];
  testsTaken: Scalars['Float'];
  time: Scalars['String'];
  wpm: Scalars['Float'];
};

export type UserStats = {
  __typename?: 'UserStats';
  userStats: Array<UserStatFields>;
};

export type CreateTestMutationVariables = Exact<{
  chars: Scalars['String'];
  wpm: Scalars['Float'];
  accuracy: Scalars['String'];
  time: Scalars['String'];
  uid: Scalars['String'];
  testTaken: Scalars['String'];
}>;


export type CreateTestMutation = { __typename?: 'Mutation', createTest: { __typename?: 'Test', time: string, accuracy: string, wpm: number, chars: string, testTaken: string } };

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


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', error?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', username: string, email: string, createdAt: string } | null } };

export type ValidateMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type ValidateMutation = { __typename?: 'Mutation', validate: { __typename?: 'FieldError', field?: string | null, message?: string | null } };

export type LeaderboardQueryVariables = Exact<{
  time: Scalars['String'];
}>;


export type LeaderboardQuery = { __typename?: 'Query', leaderboard: { __typename?: 'LeaderBoard', leaderBoard: Array<{ __typename?: 'LeaderBoardStatFields', rank: number, user: string, wpm: number, accuracy: string, time: string, testTaken: string }> } };

export type TestsQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type TestsQuery = { __typename?: 'Query', tests: Array<{ __typename?: 'Test', time: string, accuracy: string, wpm: number, chars: string, createdAt: string, testTaken: string }> };

export type UserQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'UserResponse', error?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', username: string, email: string, createdAt: string } | null } };

export type GetStatsQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetStatsQuery = { __typename?: 'Query', getStats: { __typename?: 'UserStats', userStats: Array<{ __typename?: 'UserStatFields', time: string, wpm: number, pb: number, accuracy: string, testsTaken: number }> } };


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
export const LeaderboardDocument = gql`
    query Leaderboard($time: String!) {
  leaderboard(time: $time) {
    leaderBoard {
      rank
      user
      wpm
      accuracy
      time
      testTaken
    }
  }
}
    `;

export function useLeaderboardQuery(options: Omit<Urql.UseQueryArgs<LeaderboardQueryVariables>, 'query'>) {
  return Urql.useQuery<LeaderboardQuery, LeaderboardQueryVariables>({ query: LeaderboardDocument, ...options });
};
export const TestsDocument = gql`
    query Tests($uid: String!) {
  tests(uid: $uid) {
    time
    accuracy
    wpm
    chars
    createdAt
    testTaken
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