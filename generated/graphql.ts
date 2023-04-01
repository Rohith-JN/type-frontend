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
  user: UserResponse;
  validate: FieldError;
};


export type MutationCreateTestArgs = {
  accuracy: Scalars['String'];
  time: Scalars['String'];
  uid: Scalars['String'];
  words: Scalars['String'];
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


export type MutationUserArgs = {
  uid: Scalars['String'];
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
  test?: Maybe<Test>;
  tests: Array<Test>;
};


export type QueryTestArgs = {
  id: Scalars['Int'];
};

export type Test = {
  __typename?: 'Test';
  accuracy: Scalars['String'];
  createdAt: Scalars['String'];
  creatorId: Scalars['String'];
  id: Scalars['Float'];
  time: Scalars['String'];
  words: Scalars['String'];
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

export type RegularErrorFragment = { __typename?: 'FieldError', field?: string | null, message?: string | null } & { ' $fragmentName'?: 'RegularErrorFragment' };

export type RegularUserFragment = { __typename?: 'User', id: number, uid: string, username: string, email: string, createdAt: string } & { ' $fragmentName'?: 'RegularUserFragment' };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: (
    { __typename?: 'FieldError' }
    & { ' $fragmentRefs'?: { 'RegularErrorFragment': RegularErrorFragment } }
  ) };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  uid: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', error?: Array<(
      { __typename?: 'FieldError' }
      & { ' $fragmentRefs'?: { 'RegularErrorFragment': RegularErrorFragment } }
    )> | null, user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'RegularUserFragment': RegularUserFragment } }
    ) | null } };

export type UserMutationVariables = Exact<{
  uid: Scalars['String'];
}>;


export type UserMutation = { __typename?: 'Mutation', user: { __typename?: 'UserResponse', error?: Array<(
      { __typename?: 'FieldError' }
      & { ' $fragmentRefs'?: { 'RegularErrorFragment': RegularErrorFragment } }
    )> | null, user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'RegularUserFragment': RegularUserFragment } }
    ) | null } };

export type ValidateMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type ValidateMutation = { __typename?: 'Mutation', validate: (
    { __typename?: 'FieldError' }
    & { ' $fragmentRefs'?: { 'RegularErrorFragment': RegularErrorFragment } }
  ) };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  uid
  username
  email
  createdAt
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...RegularError
  }
}
    ${RegularErrorFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $uid: String!) {
  register(
    options: {username: $username, email: $email, password: $password, uid: $uid}
  ) {
    error {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UserDocument = gql`
    mutation User($uid: String!) {
  user(uid: $uid) {
    error {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;

export function useUserMutation() {
  return Urql.useMutation<UserMutation, UserMutationVariables>(UserDocument);
};
export const ValidateDocument = gql`
    mutation Validate($username: String!, $email: String!, $password: String!) {
  validate(username: $username, email: $email, password: $password) {
    ...RegularError
  }
}
    ${RegularErrorFragmentDoc}`;

export function useValidateMutation() {
  return Urql.useMutation<ValidateMutation, ValidateMutationVariables>(ValidateDocument);
};