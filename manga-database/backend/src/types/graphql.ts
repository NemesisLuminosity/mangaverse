export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Manga {
  id: string;
  title: string;
  author?: string;
  genre?: string;
  status?: string;
  description?: string;
  coverImagePath?: string;
  externalId?: string;
  sourceApi?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserMangaList {
  id: string;
  userId: string;
  mangaId: string;
  listType: string;
  rating?: number;
  review?: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
  manga?: Manga;
  user?: User;
}

export interface UserFavorite {
  id: string;
  userId: string;
  mangaId: string;
  createdAt: string;
  manga?: Manga;
  user?: User;
}

export interface MangaInput {
  title: string;
  author?: string;
  genre?: string;
  status?: string;
  description?: string;
  coverImagePath?: string;
  externalId?: string;
  sourceApi?: string;
}

export interface UserInput {
  email?: string;
  username?: string;
  password?: string;
}

export interface MangaFilters {
  title?: string;
  author?: string;
  genre?: string;
  status?: string;
}

export interface Context {
  req: any;
  user?: User;
}

export interface Resolvers {
  Query: {
    manga: (parent: any, args: { id: string }, context: Context) => Promise<Manga | null>;
    mangas: (parent: any, args: { filters?: MangaFilters; limit?: number; offset?: number }, context: Context) => Promise<Manga[]>;
    searchManga: (parent: any, args: { query: string; limit?: number; offset?: number }, context: Context) => Promise<Manga[]>;
    user: (parent: any, args: { id: string }, context: Context) => Promise<User | null>;
    users: (parent: any, args: {}, context: Context) => Promise<User[]>;
    userMangaLists: (parent: any, args: { userId: string; listType?: string }, context: Context) => Promise<UserMangaList[]>;
    userFavorites: (parent: any, args: { userId: string }, context: Context) => Promise<UserFavorite[]>;
  };
  Mutation: {
    createManga: (parent: any, args: { input: MangaInput }, context: Context) => Promise<Manga>;
    updateManga: (parent: any, args: { id: string; input: MangaInput }, context: Context) => Promise<Manga>;
    deleteManga: (parent: any, args: { id: string }, context: Context) => Promise<boolean>;
    registerUser: (parent: any, args: { email: string; username: string; password: string }, context: Context) => Promise<User>;
    loginUser: (parent: any, args: { email: string; password: string }, context: Context) => Promise<string>;
    updateUser: (parent: any, args: { id: string; input: UserInput }, context: Context) => Promise<User>;
    addToUserList: (parent: any, args: { userId: string; mangaId: string; listType: string }, context: Context) => Promise<UserMangaList>;
    updateUserList: (parent: any, args: { id: string; rating?: number; review?: string; progress?: number }, context: Context) => Promise<UserMangaList>;
    removeFromUserList: (parent: any, args: { id: string }, context: Context) => Promise<boolean>;
    toggleFavorite: (parent: any, args: { userId: string; mangaId: string }, context: Context) => Promise<UserFavorite>;
  };
}
