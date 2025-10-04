import { gql } from '@apollo/client';

// Manga queries
export const GET_MANGAS = gql`
  query GetMangas($filters: MangaFilters, $limit: Int, $offset: Int) {
    mangas(filters: $filters, limit: $limit, offset: $offset) {
      id
      title
      author
      genre
      status
      description
      coverImagePath
      createdAt
    }
  }
`;

export const GET_MANGA = gql`
  query GetManga($id: ID!) {
    manga(id: $id) {
      id
      title
      author
      genre
      status
      description
      coverImagePath
      externalId
      sourceApi
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_MANGA = gql`
  query SearchManga($query: String!, $limit: Int, $offset: Int) {
    searchManga(query: $query, limit: $limit, offset: $offset) {
      id
      title
      author
      genre
      status
      description
      coverImagePath
      createdAt
    }
  }
`;

// User queries
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      username
      role
      emailVerified
      createdAt
    }
  }
`;

// User manga list queries
export const GET_USER_MANGA_LISTS = gql`
  query GetUserMangaLists($userId: ID!, $listType: String) {
    userMangaLists(userId: $userId, listType: $listType) {
      id
      listType
      rating
      review
      progress
      createdAt
      manga {
        id
        title
        author
        genre
        status
        coverImagePath
      }
    }
  }
`;

export const GET_USER_FAVORITES = gql`
  query GetUserFavorites($userId: ID!) {
    userFavorites(userId: $userId) {
      id
      createdAt
      manga {
        id
        title
        author
        genre
        status
        coverImagePath
      }
    }
  }
`;

// Manga mutations
export const CREATE_MANGA = gql`
  mutation CreateManga($input: MangaInput!) {
    createManga(input: $input) {
      id
      title
      author
      genre
      status
      description
      coverImagePath
    }
  }
`;

export const UPDATE_MANGA = gql`
  mutation UpdateManga($id: ID!, $input: MangaInput!) {
    updateManga(id: $id, input: $input) {
      id
      title
      author
      genre
      status
      description
      coverImagePath
    }
  }
`;

export const DELETE_MANGA = gql`
  mutation DeleteManga($id: ID!) {
    deleteManga(id: $id)
  }
`;

// User manga list mutations
export const ADD_TO_USER_LIST = gql`
  mutation AddToUserList($userId: ID!, $mangaId: ID!, $listType: String!) {
    addToUserList(userId: $userId, mangaId: $mangaId, listType: $listType) {
      id
      listType
      rating
      review
      progress
      manga {
        id
        title
        author
        coverImagePath
      }
    }
  }
`;

export const UPDATE_USER_LIST = gql`
  mutation UpdateUserList($id: ID!, $rating: Int, $review: String, $progress: Int) {
    updateUserList(id: $id, rating: $rating, review: $review, progress: $progress) {
      id
      listType
      rating
      review
      progress
      manga {
        id
        title
        author
        coverImagePath
      }
    }
  }
`;

export const REMOVE_FROM_USER_LIST = gql`
  mutation RemoveFromUserList($id: ID!) {
    removeFromUserList(id: $id)
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($userId: ID!, $mangaId: ID!) {
    toggleFavorite(userId: $userId, mangaId: $mangaId) {
      id
      manga {
        id
        title
        author
        coverImagePath
      }
    }
  }
`;
