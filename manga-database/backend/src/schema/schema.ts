import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    role: String!
    emailVerified: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Manga {
    id: ID!
    title: String!
    author: String
    genre: String
    status: String
    description: String
    coverImagePath: String
    externalId: String
    sourceApi: String
    createdAt: String!
    updatedAt: String!
  }

  type UserMangaList {
    id: ID!
    userId: ID!
    mangaId: ID!
    listType: String!
    rating: Int
    review: String
    progress: Int!
    createdAt: String!
    updatedAt: String!
    manga: Manga
    user: User
  }

  type UserFavorite {
    id: ID!
    userId: ID!
    mangaId: ID!
    createdAt: String!
    manga: Manga
    user: User
  }

  input MangaInput {
    title: String!
    author: String
    genre: String
    status: String
    description: String
    coverImagePath: String
    externalId: String
    sourceApi: String
  }

  input UserInput {
    email: String
    username: String
    password: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  input MangaFilters {
    title: String
    author: String
    genre: String
    status: String
  }

  type Query {
    # Manga queries
    manga(id: ID!): Manga
    mangas(filters: MangaFilters, limit: Int, offset: Int): [Manga!]!
    searchManga(query: String!, limit: Int, offset: Int): [Manga!]!
    
    # User queries
    user(id: ID!): User
    users: [User!]!
    
    # User manga list queries
    userMangaLists(userId: ID!, listType: String): [UserMangaList!]!
    userFavorites(userId: ID!): [UserFavorite!]!
  }

  type Mutation {
    # Manga mutations (admin only)
    createManga(input: MangaInput!): Manga!
    updateManga(id: ID!, input: MangaInput!): Manga!
    deleteManga(id: ID!): Boolean!
    
    # User mutations
    register(input: UserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateUser(id: ID!, input: UserInput!): User!
    
    # User manga list mutations
    addToUserList(userId: ID!, mangaId: ID!, listType: String!): UserMangaList!
    updateUserList(id: ID!, rating: Int, review: String, progress: Int): UserMangaList!
    removeFromUserList(id: ID!): Boolean!
    toggleFavorite(userId: ID!, mangaId: ID!): UserFavorite!
  }
`;
