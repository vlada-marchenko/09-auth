import type { Note } from '../../types/note'
import { nextServer } from './api'
import User from '../../types/user'


export interface FetchParams {
    search?: string,
    tag?: string,
    page: number,
    perPage?: number,
    sortBy?: string
}

export interface CreateParams {
    title: string,
    content: string,
    tag: string
}

export interface HttpResponse {
    notes: Note[]
    totalPages: number
}

export interface RegisterRequest {
    username: string,
    email: string,
    password: string,
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface CheckSessionRequest {
    success: boolean;
}

export interface UpdateUserRequest {
    username?: string;
}


export async function fetchNotes({search = '', page = 1, tag = '', perPage = 12}: FetchParams): Promise <HttpResponse> {
    const params: Record<string, string | number> = { page, perPage };
    if (search.trim()) params.search = search.trim();
    if (tag.trim()) params.tag = tag.trim();

    const { data } = await nextServer<HttpResponse>(`/notes`, { params })
    return data
}


export async function fetchNoteById(id:string): Promise <Note> {
    const { data } = await nextServer<Note>(`/notes/${id}`);
    return data;
}

export async function createNote({title, content, tag}: CreateParams): Promise <Note> {
    const { data } = await nextServer.post<Note>(`/notes`, 
        { title, content, tag })
    return data
}

export async function deleteNote(id: string): Promise <Note> {
    const { data } = await nextServer.delete<Note>(`/notes/${id}` )
    return data
}

export async function register(data: RegisterRequest): Promise<User> {
    const res = await nextServer.post<User>('/auth/register', data)
    return res.data
}

export async function login(data: LoginRequest): Promise<User> {
    const res = await nextServer.post<User>('/auth/login', data)
    return res.data
}

export async function checkSession() {
    const response = await nextServer<CheckSessionRequest>('/auth/session');
    return response;
}

export async function getMe() {
    const response = await nextServer<User>('/users/me');
    return response.data;
}

export async function logOut() {
    await nextServer.post<CheckSessionRequest>('/auth/logout');
}

export async function updateUser(data: UpdateUserRequest) {
    const response = await nextServer.patch<User>('/users/me', data);
    return response.data;
}