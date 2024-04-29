import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient, authConfig } from "../../api/apiClient";
import { endpoints } from "../apiEndpoints";

import { AxiosError, AxiosResponse } from "axios";

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

export type CreateNoteVariables = {
  id: string;
  title: string;
  content: string;
  accessToken: string;
};
async function createNote(data: CreateNoteVariables) {
  const { accessToken, ...noteData } = data;

  return await apiClient.post(
    endpoints.notes.create.url,
    noteData,
    authConfig(accessToken)
  );
}

async function updateNote(data: CreateNoteVariables) {
  const { accessToken, ...noteData } = data;

  return await apiClient.put(
    endpoints.notes.update(noteData.id).url,
    noteData,
    authConfig(accessToken)
  );
}

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<NoteResponse>,
    AxiosError,
    CreateNoteVariables
  >({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<NoteResponse>,
    AxiosError,
    CreateNoteVariables
  >({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
