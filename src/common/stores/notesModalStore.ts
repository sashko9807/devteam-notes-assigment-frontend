import { create } from "zustand";
import { NoteResponse } from "../hooks/notes";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";

type NoteModalActions = {
  toggleDelete: (note: NoteResponse) => void;
  toggleUpdate: (note: NoteResponse) => void;
  toggleCreate: (note: NoteResponse) => void;
};

type NoteModalStore = {
  deleteModal: boolean;
  editModal: boolean;
  createModal: boolean;
  selectedNote: NoteResponse;
  actions: NoteModalActions;
};

const initialNote: NoteResponse = {
  id: "",
  title: "",
  content: "",
  createdAt: "",
  updatedAt: "",
};
const noteModalStore = create<NoteModalStore>((set) => ({
  deleteModal: false,
  editModal: false,
  createModal: false,
  selectedNote: initialNote,
  actions: {
    toggleCreate: () => {
      set((state) => ({ createModal: !state.createModal }));
    },
    toggleDelete(note) {
      set((state) => {
        const onClose = !state;
        return {
          selectedNote: onClose ? initialNote : note,
          deleteModal: !state.deleteModal,
        };
      });
    },
    toggleUpdate(note) {
      set((state) => {
        const onClose = !state;
        return {
          selectedNote: onClose ? initialNote : note,
          editModal: !state.editModal,
        };
      });
    },
  },
}));

export const useDeleteNoteDialogStore = () =>
  noteModalStore(
    useShallow((state) => ({
      open: state.deleteModal,
      toggleFn: state.actions.toggleDelete,
      note: state.selectedNote,
    }))
  );
export const useCreateNoteDialogStore = () =>
  noteModalStore(
    useShallow((state) => ({
      open: state.createModal,
      toggleFn: state.actions.toggleCreate,
    }))
  );
export const useEditNoteDialogStore = () =>
  noteModalStore(
    useShallow((state) => ({
      open: state.createModal,
      toggleFn: state.actions.toggleCreate,
      note: state.selectedNote,
    }))
  );
