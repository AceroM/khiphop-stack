import { scopedDb } from "~/db";
import e from "~/db/edgeql";

export const searchNotes = (clerkId: string, query: string) =>
  e
    .select(e.Note, (note) => ({
      id: true,
      name: true,
      description: true,
      filter: e.set(
        e.op(note.name, "ilike", `%${query}%`),
        e.op(note.description, "ilike", `%${query}%`)
      ),
    }))
    .run(scopedDb(clerkId));

export const getNote = (noteId: string, clerkId: string) =>
  e
    .select(e.Note, (note) => ({
      id: true,
      name: true,
      description: true,
      filter: e.op(note.id, "=", e.uuid(noteId)),
    }))
    .run(scopedDb(clerkId));

export const createNote = (
  name: string,
  description: string,
  clerkId: string
) =>
  e
    .insert(e.Note, {
      name,
      description,
      author: e.select(e.User, (user) => ({
        filter: e.op(user.clerk_id, "=", clerkId),
      })),
    })
    .run(scopedDb(clerkId));

export const updateNote = (
  noteId: string,
  name: string,
  description: string,
  clerkId: string
) =>
  e
    .update(e.Note, (note) => ({
      filter: e.op(note.id, "=", e.uuid(noteId)),
      set: { name, description },
    }))
    .run(scopedDb(clerkId));

export const deleteNote = (noteId: string, clerkId: string) =>
  e
    .delete(e.Note, (note) => ({ filter: e.op(note.id, "=", e.uuid(noteId)) }))
    .run(scopedDb(clerkId));
