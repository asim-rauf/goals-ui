/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from '.';

export const addGoal = async (data: {
  type: string;
  title: string;
  userId: string | null | undefined;
  description: string;
}) => {
  try {
    return await apiRequest<any>('/goals', 'POST', data, false);
  } catch (error) {
    throw error;
  }
};
export const addTask = async (data: {
  goalId: number;
  title: string;
  description: string;
}) => {
  try {
    return await apiRequest<any>('/task', 'POST', data, false);
  } catch (error) {
    throw error;
  }
};

export const getGoals = async (userId: string | null | undefined) => {
  try {
    return await apiRequest<any>(`/goals/user/${userId}`, 'GET', null, false);
  } catch (error) {
    throw error;
  }
};

export const getTasks = async (userId: string | null | undefined) => {
  try {
    return await apiRequest<any>(`/task/user/${userId}`, 'GET', null, false);
  } catch (error) {
    throw error;
  }
};
