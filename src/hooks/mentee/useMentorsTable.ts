import { useState, useEffect, useCallback } from 'react';
import { mentorApi } from '@/requests/modules/mentor';
import type { GridSortModel, GridPaginationModel } from '@mui/x-data-grid';
import { useToast } from '@/providers/hooks/useToast';
import type { Mentor } from '@/types/mentor';

export interface MentorsTableState {
  mentors: Mentor[];
  loading: boolean;
  totalMentors: number;
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
  searchQuery: string;
  viewDialogOpen: boolean;
  viewMentor: Mentor | null;
  viewLoading: boolean;
}

export const useMentorsTable = () => {
  const [state, setState] = useState<MentorsTableState>({
    mentors: [],
    loading: false,
    totalMentors: 0,
    page: 0,
    pageSize: 10,
    sortModel: [{ field: 'id', sort: 'desc' }],
    searchQuery: '',
    viewDialogOpen: false,
    viewMentor: null,
    viewLoading: false,
  });
  
  const { show } = useToast();

  const fetchMentors = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    
    const response = await mentorApi.list({
      page: state.page + 1, // API pagination is 1-based, DataGrid is 0-based
      pageSize: state.pageSize,
      search: state.searchQuery,
      sort: state.sortModel[0]?.sort === 'desc' ? 'desc' : 'asc',
      name: state.sortModel[0]?.field as keyof Mentor,
    });

    if (response.success && response.data) {
      const data = response.data;
      setState(prev => ({
        ...prev,
        mentors: data.items,
        totalMentors: data.pagination.total,
      }));
    } else {
      show(response.message || 'Failed to load mentors', 'error');
    }
    
    setState(prev => ({ ...prev, loading: false }));
  }, [
    state.page, 
    state.pageSize, 
    state.searchQuery, 
    state.sortModel,
    show
  ]);

  // Initial load
  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  // Handle pagination change
  const handlePaginationChange = (model: GridPaginationModel) => {
    setState(prev => ({
      ...prev,
      page: model.page,
      pageSize: model.pageSize,
    }));
  };

  // Handle sort change
  const handleSortChange = (model: GridSortModel) => {
    setState(prev => ({
      ...prev,
      sortModel: model,
    }));
  };

  // Handle search
  const handleSearch = (query: string) => {
    setState(prev => ({
      ...prev,
      searchQuery: query,
      page: 0, // Reset to first page on new search
    }));
  };

  // Handle view mentor
  const handleViewClick = async (mentorId: number) => {
    setState(prev => ({
      ...prev,
      viewLoading: true,
    }));
    
    const response = await mentorApi.get(mentorId);
    
    if (response.success && response.data) {
      setState(prev => ({
        ...prev,
        viewMentor: response.data || null,
        viewDialogOpen: true,
      }));
    } else {
      show(response.message || 'Failed to load mentor details', 'error');
    }
    
    setState(prev => ({
      ...prev,
      viewLoading: false,
    }));
  };
  
  // Close view dialog
  const handleViewClose = () => {
    setState(prev => ({
      ...prev,
      viewDialogOpen: false,
      viewMentor: null,
    }));
  };

  return {
    // State
    mentors: state.mentors,
    loading: state.loading,
    totalMentors: state.totalMentors,
    page: state.page,
    pageSize: state.pageSize,
    sortModel: state.sortModel,
    searchQuery: state.searchQuery,
    viewDialogOpen: state.viewDialogOpen,
    viewMentor: state.viewMentor,
    viewLoading: state.viewLoading,
    
    // Handlers
    handlePaginationChange,
    handleSortChange,
    handleSearch,
    handleViewClick,
    handleViewClose,
    refreshMentors: fetchMentors,
  };
};
