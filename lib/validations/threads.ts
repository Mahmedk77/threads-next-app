import * as z from 'zod';

export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3, "Thread must be at least 3 characters long"),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    comment: z.string().nonempty().min(3, "Comment must be at least 3 characters long"),
    accountId: z.string(),
})