import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

// DO NOT USE TYPESCRIPT

Post // table: posts
    id: number
    title: string
    body: string
    created_at: string
    author_id: string
    likes_count: number

Reaction // table: reactions
    id: number
    post_id: number // foreign key to Post
    user_id: string
    emoji: string

*/

// Hooks for Post table
export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => fromSupabase(supabase.from('posts').select('*')),
});

export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPost) => fromSupabase(supabase.from('posts').insert([newPost])),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPost) => fromSupabase(supabase.from('posts').update(updatedPost).eq('id', updatedPost.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId) => fromSupabase(supabase.from('posts').delete().eq('id', postId)),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

// Hooks for Reaction table
export const useReactions = () => useQuery({
    queryKey: ['reactions'],
    queryFn: () => fromSupabase(supabase.from('reactions').select('*')),
});

export const useAddReaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newReaction) => fromSupabase(supabase.from('reactions').insert([newReaction])),
        onSuccess: () => {
            queryClient.invalidateQueries('reactions');
        },
    });
};

export const useUpdateReaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedReaction) => fromSupabase(supabase.from('reactions').update(updatedReaction).eq('id', updatedReaction.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('reactions');
        },
    });
};

export const useDeleteReaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (reactionId) => fromSupabase(supabase.from('reactions').delete().eq('id', reactionId)),
        onSuccess: () => {
            queryClient.invalidateQueries('reactions');
        },
    });
};