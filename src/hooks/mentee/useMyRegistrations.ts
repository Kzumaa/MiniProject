import { useState, useEffect, useCallback } from 'react';
import type { Registration, Subject, ApiList, ApiResponse } from '@/types';
import { useToast } from '@/providers/hooks/useToast';
import { useAuth } from '@/providers/hooks/useAuth';
import type { GridSortModel, GridPaginationModel } from '@mui/x-data-grid';
import { httpClient } from '@/requests/HttpClient';
import { mockMenteeRegistrations } from '@/requests/mock/menteeRegistrations';
import { log } from 'console';

interface RegistrationWithSubject extends Registration {
  subject?: Subject;
}

const USE_MOCK = true; // Set to false to use real API

interface MyRegistrationsState {
  registrations: RegistrationWithSubject[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
}

export const useMyRegistrations = () => {
  const { show } = useToast();
  const { user } = useAuth();
  
  const [state, setState] = useState<MyRegistrationsState>({
    registrations: [],
    loading: false,
    total: 0,
    page: 0,
    pageSize: 10,
    sortModel: [{ field: 'createdAt', sort: 'desc' }],
  });

  const fetchRegistrations = useCallback(async () => {
    if (!user) return;
    
    setState(prev => ({ ...prev, loading: true }));
    try {
      let response: { data: ApiResponse<ApiList<RegistrationWithSubject>> };
      
      if (USE_MOCK) {
        // Use mock data
        response = { data: mockMenteeRegistrations };

        console.log("mock data",response.data);
        
      } else {
        // Use real API
        response = await httpClient.get<ApiResponse<ApiList<RegistrationWithSubject>>>('/mentee/registrations', {
          params: {
            page: state.page + 1,
            pageSize: state.pageSize,
            sort: state.sortModel[0]?.sort || 'desc',
            sortBy: state.sortModel[0]?.field || 'createdAt'
          }
        });
      }

      if (response.data.success && response.data.data) {
        setState(prev => ({
          ...prev,
          registrations: response.data.data!.items,
          total: response.data.data!.pagination.total,
        }));
      } else {
        show(response.data.message || 'Failed to load registrations', 'error');
      }
    } catch (error) {
      show('Error loading registrations', 'error');
      console.error(error);
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [state.page, state.pageSize, state.sortModel, user, show]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handlePaginationChange = (model: GridPaginationModel) => {
    setState(prev => ({
      ...prev,
      page: model.page,
      pageSize: model.pageSize,
    }));
  };

  const handleSortChange = (model: GridSortModel) => {
    setState(prev => ({
      ...prev,
      sortModel: model,
    }));
  };

  return {
    ...state,
    handlePaginationChange,
    handleSortChange,
  };
};