import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { API_TAGS } from './api-tags';
import { getGoals } from './api-actions';

const useGetGoals = () => {
  const { userId } = useAuth();

  const query = useQuery({
    queryKey: [API_TAGS.GET_GOALS, userId],
    queryFn: () => getGoals(userId),
    enabled: Boolean(userId),
    refetchOnMount: true,
    staleTime: 0,
    retry: false,
  });

  return { ...query };
};

export default useGetGoals;
