import {z} from 'zod'

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});

export const updatePostInput = z.object({
    id : z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
});

export const userSignupSchema = z.object({
    email : z.string().email(),
    name : z.string(),
    password : z.string().min(8).max(15)
})

export const userSigninSchema = z.object({
    email : z.string().email(),
    name : z.string().optional(),
    password : z.string().min(8).max(15)
})

export type UserSigninSchema= z.infer<typeof userSigninSchema>
export type CreatePostInput= z.infer<typeof createPostInput>
export type UserSignupSchema= z.infer<typeof userSignupSchema>
export type UpdatePostInput= z.infer<typeof updatePostInput>
