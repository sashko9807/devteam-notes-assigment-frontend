import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient, authConfig } from "../../api/apiClient";
import { endpoints } from "../apiEndpoints";

import { AxiosError, AxiosResponse } from "axios";
import { useAuthStore } from "../../components/auth/AuthStoreProvider";

export type NoteResponse = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

async function fetchNotes(accessToken: string) {
  const response = await apiClient.get<NoteResponse[]>(
    endpoints.notes.get.url,
    authConfig(accessToken)
  );

  return response.data;
}

export const notesQueryOptions = (accessToken: string) => {
  return queryOptions<NoteResponse[]>({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(accessToken),
    retry: false,
  });
};

async function deleteNote(data: DeleteMutation) {
  return await apiClient.delete(
    endpoints.notes.delete(data.noteId).url,
    authConfig(data.accessToken)
  );
}

export type DeleteMutation = {
  noteId: string;
  accessToken: string;
};
export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, DeleteMutation>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export type CreateNoteVariables = {
  id: string;
  title: string;
  content: string;
  accessToken: string;
};
async function createNote(accessToken: string, data: CreateNoteVariables) {
  return await apiClient.post(
    endpoints.notes.create.url,
    data,
    authConfig(accessToken)
  );
}

async function updateNote(accessToken: string, data: CreateNoteVariables) {
  return await apiClient.put(
    endpoints.notes.update(data.id).url,
    data,
    authConfig(accessToken)
  );
}

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);
  return useMutation<
    AxiosResponse<NoteResponse>,
    AxiosError,
    CreateNoteVariables
  >({
    mutationFn: (data) => createNote(accessToken, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useUpdateNoteMutation = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<NoteResponse>,
    AxiosError,
    CreateNoteVariables
  >({
    mutationFn: (data) => updateNote(accessToken, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
