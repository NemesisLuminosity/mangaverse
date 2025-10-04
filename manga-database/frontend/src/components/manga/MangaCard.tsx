import React from 'react';
import { Heart, Plus, Eye } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../contexts/AuthContext';
import { ADD_TO_USER_LIST, TOGGLE_FAVORITE } from '../../graphql/queries';

interface Manga {
  id: string;
  title: string;
  author?: string;
  genre?: string;
  status?: string;
  description?: string;
  coverImagePath?: string;
}

interface MangaCardProps {
  manga: Manga;
  onViewDetails?: (manga: Manga) => void;
  isFavorite?: boolean;
  userListType?: string;
}

const MangaCard: React.FC<MangaCardProps> = ({ 
  manga, 
  onViewDetails, 
  isFavorite = false,
  userListType 
}) => {
  const { user } = useAuth();
  const [addToList] = useMutation(ADD_TO_USER_LIST);
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);

  const handleAddToList = async (listType: string) => {
    if (!user) return;
    
    try {
      await addToList({
        variables: {
          userId: user.id,
          mangaId: manga.id,
          listType
        }
      });
    } catch (error) {
      console.error('Error adding to list:', error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) return;
    
    try {
      await toggleFavorite({
        variables: {
          userId: user.id,
          mangaId: manga.id
        }
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'ongoing': return 'bg-green-500/20 text-green-300 ring-green-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-300 ring-blue-500/30';
      case 'hiatus': return 'bg-yellow-500/20 text-yellow-300 ring-yellow-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 ring-red-500/30';
      default: return 'bg-slate-500/20 text-slate-300 ring-slate-500/30';
    }
  };

  return (
    <div className="group relative bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-2xl overflow-hidden shadow-xl hover:ring-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Subtle gradient glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={manga.coverImagePath || '/api/placeholder/300/200'}
          alt={manga.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 truncate" title={manga.title}>
          {manga.title}
        </h3>
        
        {/* Author */}
        {manga.author && (
          <p className="text-sm text-slate-400 mb-3">
            by {manga.author}
          </p>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {manga.status && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ring-1 ${getStatusColor(manga.status)}`}>
              {manga.status}
            </span>
          )}
          {manga.genre && (
            <span className="px-2 py-1 text-xs font-medium text-purple-300 bg-purple-500/20 ring-1 ring-purple-500/30 rounded-full">
              {manga.genre.split(',')[0]}
            </span>
          )}
        </div>
        
        {/* Description */}
        {manga.description && (
          <p className="text-sm text-slate-300 flex-1 mb-4 overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}>
            {manga.description}
          </p>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <button
            onClick={() => onViewDetails?.(manga)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-purple-500/20 hover:bg-purple-500/30 ring-1 ring-purple-500/30 rounded-lg transition"
          >
            <Eye className="h-4 w-4" />
            View
          </button>
          
          {user && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-lg transition ${
                  isFavorite 
                    ? 'text-red-400 bg-red-500/20 hover:bg-red-500/30 ring-1 ring-red-500/30' 
                    : 'text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/20 ring-1 ring-white/10 hover:ring-red-500/30'
                }`}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={() => handleAddToList('reading')}
                disabled={userListType === 'reading'}
                className="p-2 rounded-lg text-slate-400 hover:text-green-400 bg-white/5 hover:bg-green-500/20 ring-1 ring-white/10 hover:ring-green-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add to reading list"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MangaCard;
