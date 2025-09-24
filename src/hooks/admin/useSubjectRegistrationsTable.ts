import { useState, useEffect, useCallback } from 'react';
import { registrationApi } from '@/requests/modules/registration';
import type { MenteeSubjectRegistration } from '@/types/registration';
import type { GridSortModel, GridPaginationModel } from '@mui/x-data-grid';
import { useToast } from '@/providers/hooks/useToast';

export interface SubjectRegistrationsTableState {
  registrations: MenteeSubjectRegistration[];
  loading: boolean;
  totalRegistrations: number;
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
  searchQuery: string;
  viewDialogOpen: boolean;
  viewRegistration: MenteeSubjectRegistration | null;
  viewLoading: boolean;
}

export const useSubjectRegistrationsTable = () => {
  const [state, setState] = useState<SubjectRegistrationsTableState>({
    registrations: [],
    loading: false,
    totalRegistrations: 0,
    page: 0,
    pageSize: 10,
    sortModel: [{ field: 'id', sort: 'desc' }],
    searchQuery: '',
    viewDialogOpen: false,
    viewRegistration: null,
    viewLoading: false,
  });
  
  const { show } = useToast();

  const fetchRegistrations = useCallback(() => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      // For demo, use mock data
      const response = registrationApi.getMockSubjectRegistrations();
      
      /* Uncomment when real API is available
      const response = await registrationApi.listSubjectRegistrations({
        page: state.page + 1, // API pagination is 1-based, DataGrid is 0-based
        pageSize: state.pageSize,
        search: state.searchQuery,
        sort: state.sortModel[0]?.sort === 'desc' ? 'desc' : 'asc',
        name: state.sortModel[0]?.field as keyof MenteeSubjectRegistration,
      });
      */

      if (response.success && response.data) {
        const data = response.data;
        setState(prev => ({
          ...prev,
          registrations: data.items,
          totalRegistrations: data.pagination.total,
        }));
      } else {
        show(response.message || 'Failed to load registrations', 'error');
      }
    } catch (error) {
      show('Error loading registrations', 'error');
      console.error('Error loading registrations:', error);
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [show]);

  // Initial load
  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations, state.page, state.pageSize, state.searchQuery, state.sortModel]);

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

  // Handle view registration
  const handleViewClick = async (registrationId: number) => {
    setState(prev => ({
      ...prev,
      viewLoading: true,
    }));
    
    try {
      // For demo, find the registration in the current list
      const registration = state.registrations.find(r => r.id === registrationId);
      
      if (registration) {
        setState(prev => ({
          ...prev,
          viewRegistration: registration,
          viewDialogOpen: true,
        }));
      } else {
        /* Uncomment when real API is available
        const response = await registrationApi.getSubjectRegistration(registrationId);
        
        if (response.success && response.data) {
          setState(prev => ({
            ...prev,
            viewRegistration: response.data || null,
            viewDialogOpen: true,
          }));
        } else {
          show(response.message || 'Failed to load registration details', 'error');
        }
        */
        show('Registration not found', 'error');
      }
    } catch (error) {
      show('Error loading registration details', 'error');
      console.error('Error loading registration details:', error);
    } finally {
      setState(prev => ({
        ...prev,
        viewLoading: false,
      }));
    }
  };
  
  // Close view dialog
  const handleViewClose = () => {
    setState(prev => ({
      ...prev,
      viewDialogOpen: false,
      viewRegistration: null,
    }));
  };

  return {
    // State
    registrations: state.registrations,
    loading: state.loading,
    totalRegistrations: state.totalRegistrations,
    page: state.page,
    pageSize: state.pageSize,
    sortModel: state.sortModel,
    searchQuery: state.searchQuery,
    viewDialogOpen: state.viewDialogOpen,
    viewRegistration: state.viewRegistration,
    viewLoading: state.viewLoading,
    
    // Handlers
    handlePaginationChange,
    handleSortChange,
    handleSearch,
    handleViewClick,
    handleViewClose,
    refreshRegistrations: fetchRegistrations,
  };
};