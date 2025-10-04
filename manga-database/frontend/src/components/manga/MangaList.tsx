import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_MANGAS, SEARCH_MANGA } from '../../graphql/queries';
import MangaCard from './MangaCard';

interface Manga {
  id: string;
  title: string;
  author?: string;
  genre?: string;
  status?: string;
  description?: string;
  coverImagePath?: string;
}

interface MangaListProps {
  onViewDetails?: (manga: Manga) => void;
}

const MangaList: React.FC<MangaListProps> = ({ onViewDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    status: ''
  });
  const [page, setPage] = useState(0);
  const limit = 12;

  // Use search query if there's a search term, otherwise use regular query
  const { data: searchData, loading: searchLoading, error: searchError } = useQuery(SEARCH_MANGA, {
    variables: { query: searchQuery, limit, offset: page * limit },
    skip: !searchQuery.trim()
  });

  const { data: mangaData, loading: mangaLoading, error: mangaError } = useQuery(GET_MANGAS, {
    variables: { 
      filters: {
        ...(filters.genre && { genre: filters.genre }),
        ...(filters.status && { status: filters.status })
      },
      limit, 
      offset: page * limit 
    },
    skip: !!searchQuery.trim()
  });

  const loading = searchLoading || mangaLoading;
  const error = searchError || mangaError;
  const mangas = searchData?.searchManga || mangaData?.mangas || [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleFilterChange = (filterType: string) => (event: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: event.target.value
    }));
    setPage(0);
  };

  const clearFilters = () => {
    setFilters({ genre: '', status: '' });
    setSearchQuery('');
    setPage(0);
  };

  const hasActiveFilters = searchQuery || filters.genre || filters.status;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-400/30 border-t-purple-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3">
        Error loading manga: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background */}
      <div className="fixed top-0 w-full h-screen -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-slate-950 to-slate-950" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.1), transparent 50%)",
          }}
        />
      </div>

      <div className="relative isolate overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-white tracking-tight mb-2">
              📚 Manga Collection
            </h1>
            <p className="text-slate-300">Discover and track your favorite manga series</p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search manga by title, author, or description..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 backdrop-blur-xl text-slate-100 placeholder-slate-400 ring-1 ring-white/10 focus:ring-2 focus:ring-purple-400/50 focus:outline-none"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filters:</span>
              </div>
              
              {/* Genre Filter */}
              <div className="relative">
                <select
                  value={filters.genre}
                  onChange={handleFilterChange('genre')}
                  className="appearance-none bg-black/40 backdrop-blur-xl text-slate-100 px-4 py-2 pr-8 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-purple-400/50 focus:outline-none text-sm"
                >
                  <option value="">All Genres</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Shounen">Shounen</option>
                  <option value="Shoujo">Shoujo</option>
                </select>
              </div>
              
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={handleFilterChange('status')}
                  className="appearance-none bg-black/40 backdrop-blur-xl text-slate-100 px-4 py-2 pr-8 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-purple-400/50 focus:outline-none text-sm"
                >
                  <option value="">All Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="hiatus">Hiatus</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 ring-1 ring-white/10 rounded-lg transition"
                >
                  <X className="h-3 w-3" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {mangas.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg">
                {hasActiveFilters ? 'No manga found matching your criteria' : 'No manga available'}
              </div>
            </div>
          ) : (
            <>
              <div className="text-slate-300 mb-6">
                Found {mangas.length} manga
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mangas.map((manga: Manga) => (
                  <MangaCard 
                    key={manga.id}
                    manga={manga} 
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MangaList;
