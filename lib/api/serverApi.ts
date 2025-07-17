import { nextServer } from "./api";
import User from "../../types/user";
import { cookies } from "next/headers";
import { CheckSessionRequest } from "./clientApi";
import { Note } from "../../types/note";

export async function checkServerSession() {
    const cookieData = await cookies()
    const res = await nextServer<CheckSessionRequest>('/auth/session', {
        headers: {
            Cookie: cookieData.toString()
    }});
    return res;
}

export async function getServerMe() {
    const cookieData = await cookies()
    const { data } = await nextServer<User>('/users/me', {
        headers: {
            Cookie: cookieData.toString()
    }});
    return data;
}

export async function getServerNoteById(noteId: string) {
    const cookieData = await cookies();
    const { data } = await nextServer<Note>(`/notes/${noteId}`, {
        headers: {
            Cookie: cookieData.toString(),
        },
    });
    return data;
}