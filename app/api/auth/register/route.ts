import { hash } from "@/util/cryptoUtil";
import prisma from "@/util/prisma";
import crypto from 'crypto';

export interface RegisterRequest {
    username: string;
    password: string;
}

export enum RegisterError {
    UsernameTaken = 'Username is already taken.',
    UsernameInvalid = 'The username can only contain letters, numbers, and dashes (-).',
    UsernameTooShort = 'The username is too short. It must be at least 4 characters.',
    PasswordTooShort = 'The password is too short. It must be at least 6 characters.',
    PasswordTooLong = 'The password is too long. It must be at most 128 characters.',
}

const usernameRegex = /^[A-Za-z0-9\-]+$/;
export async function POST(req: Request) {
    const { username, password } = await req.json() as RegisterRequest;
    if (!usernameRegex.test(username)) {
        return new Response(null, {
            status: 400,
            statusText: RegisterError.UsernameInvalid
        });
    }
    if (password.length < 6) {
        return new Response(null, {
            status: 400,
            statusText: RegisterError.PasswordTooShort
        });
    }
    if (password.length > 128) {
        return new Response(null, {
            status: 400,
            statusText: RegisterError.PasswordTooLong
        });
    }
    if (username.length < 4) {
        return new Response(null, {
            status: 400,
            statusText: RegisterError.UsernameTooShort
        });
    }

    const passwordSalt = crypto.randomBytes(8).toString('base64');
    const passwordHash = hash(password + passwordSalt);
    try {
        await prisma.user.create({
            data: {
                username,
                displayName: username,
                password: passwordHash,
                passwordSalt
            }
        });
    } catch (e) {
        return new Response(null, {
            status: 400,
            statusText: RegisterError.UsernameTaken
        });
    }
    return new Response(null, { status: 200 });
}