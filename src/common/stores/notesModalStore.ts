import { create } from "zustand";
import { NoteResponse } from "../hooks/notes";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";

type NoteModalActions = {
  toggleDelete: () => void;
  toggleCreate: () => void;
  setSelectedNote: (note: NoteResponse) => void;
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
      set((state) => {
        const isClosing = !state.createModal;
        return {
          selectedNote: isClosing ? state.selectedNote : initialNote,
          createModal: !state.createModal,
        };
      });
    },
    toggleDelete() {
      set((state) => {
        return {
          deleteModal: !state.deleteModal,
        };
      });
    },
    setSelectedNote(note) {
      set(() => ({ selectedNote: note }));
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

export const useSelectNoteAaction = () =>
  noteModalStore((state) => state.actions.setSelectedNote);

export const useSelectedNote = () =>
  noteModalStore((state) => state.selectedNote);
