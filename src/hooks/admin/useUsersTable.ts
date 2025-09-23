import { useState, useEffect, useCallback } from 'react';
import { userApi } from '@/requests/modules/user';
import type { User } from '@/types/uset';
import type { GridSortModel, GridPaginationModel } from '@mui/x-data-grid';
import { useToast } from '@/providers/hooks/useToast';

export interface UsersTableState {
  users: User[];
  loading: boolean;
  totalUsers: number;
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
  searchQuery: string;
  deleteDialogOpen: boolean;
  selectedUserId: number | null;
  deleteLoading: boolean;
  viewDialogOpen: boolean;
  viewUser: User | null;
  viewLoading: boolean;
}

export const useUsersTable = () => {
  const [state, setState] = useState<UsersTableState>({
    users: [],
    loading: false,
    totalUsers: 0,
    page: 0,
    pageSize: 10,
    sortModel: [{ field: 'id', sort: 'desc' }],
    searchQuery: '',
    deleteDialogOpen: false,
    selectedUserId: null,
    deleteLoading: false,
    viewDialogOpen: false,
    viewUser: null,
    viewLoading: false,
  });
  
  const { show } = useToast();

  const fetchUsers = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await userApi.list({
        page: state.page + 1, // API pagination is 1-based, DataGrid is 0-based
        pageSize: state.pageSize,
        search: state.searchQuery,
        sort: state.sortModel[0]?.sort === 'desc' ? 'desc' : 'asc',
        name: state.sortModel[0]?.field as keyof User,
      });

      if (response.success && response.data) {
        const data = response.data;
        setState(prev => ({
          ...prev,
          users: data.items,
          totalUsers: data.pagination.total,
        }));
      } else {
        show(response.message || 'Failed to load users', 'error');
      }
    } catch (error) {
      show('Error loading users', 'error');
      console.error('Error loading users:', error);
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [
    state.page, 
    state.pageSize, 
    state.searchQuery, 
    state.sortModel,
    show
  ]);

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  // Open delete confirmation
  const handleDeleteClick = (userId: number) => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: true,
      selectedUserId: userId,
    }));
  };

  // Close delete confirmation
  const handleDeleteCancel = () => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: false,
      selectedUserId: null,
    }));
  };

  // Execute delete
  const handleDeleteConfirm = async () => {
    if (state.selectedUserId === null) return;
    
    setState(prev => ({ ...prev, deleteLoading: true }));
    try {
      const response = await userApi.remove(state.selectedUserId);
      
      if (response.success) {
        show('User deleted successfully', 'success');
        // Refresh user list
        fetchUsers();
      } else {
        show(response.message || 'Failed to delete user', 'error');
      }
    } catch (error) {
      show('Error deleting user', 'error');
      console.error('Error deleting user:', error);
    } finally {
      setState(prev => ({ 
        ...prev, 
        deleteLoading: false,
        deleteDialogOpen: false,
        selectedUserId: null,
      }));
    }
  };

  // Handle view user
  const handleViewClick = async (userId: number) => {
    setState(prev => ({
      ...prev,
      viewLoading: true,
    }));
    
    try {
      const response = await userApi.get(userId);
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          viewUser: response.data || null,
          viewDialogOpen: true,
        }));
      } else {
        show(response.message || 'Failed to load user details', 'error');
      }
    } catch (error) {
      show('Error loading user details', 'error');
      console.error('Error loading user details:', error);
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
      viewUser: null,
    }));
  };

  return {
    // State
    users: state.users,
    loading: state.loading,
    totalUsers: state.totalUsers,
    page: state.page,
    pageSize: state.pageSize,
    sortModel: state.sortModel,
    searchQuery: state.searchQuery,
    deleteDialogOpen: state.deleteDialogOpen,
    selectedUserId: state.selectedUserId,
    deleteLoading: state.deleteLoading,
    viewDialogOpen: state.viewDialogOpen,
    viewUser: state.viewUser,
    viewLoading: state.viewLoading,
    
    // Handlers
    handlePaginationChange,
    handleSortChange,
    handleSearch,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleViewClick,
    handleViewClose,
    refreshUsers: fetchUsers,
  };
};
