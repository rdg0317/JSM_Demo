import { z } from "zod";

export const signupValidation = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .regex(/^[A-Za-z ]+$/, { message: 'Name can only contain alphabets (A-Z, a-z)' }),
  
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain alphanumeric characters and underscores' }),
  
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .regex(/@iiitg\.ac\.in$/, { message: 'Email must be from the @iiitg.ac.in domain' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter (A-Z)' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter (a-z)' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number (0-9)' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
});

export const signinValidation = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .regex(/@iiitg\.ac\.in$/, { message: 'Email must be from the @iiitg.ac.in domain' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter (A-Z)' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter (a-z)' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number (0-9)' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
});

export const PostValidation = z.object({
  caption: z.string().max(2200),
  file: z.custom<File[]>(),
  location:z.string().min(2).max(100),
  tags: z.string()
})

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .regex(/^[A-Za-z ]+$/, { message: 'Name can only contain alphabets (A-Z, a-z)' }),
  
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain alphanumeric characters and underscores' }),
    email: z
    .string()
    .email({ message: 'Invalid email address' })
    .regex(/@iiitg\.ac\.in$/, { message: 'Email must be from the @iiitg.ac.in domain' }),
  bio: z.string(),
})