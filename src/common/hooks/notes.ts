import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient, authConfig } from "../../api/apiClient";
import { endpoints } from "../apiEndpoints";

import { AxiosError, AxiosResponse } from "axios";
import { authStore, useAccessToken, useAuth } from "../stores/authStore";

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

  return response;
}

export const notesQueryOptions = (token: string) => {
  return queryOptions<AxiosResponse<NoteResponse[]>>({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(token),
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
