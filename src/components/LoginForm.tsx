'use client'

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
    const searchParams = useSearchParams();

    const loginError = searchParams.get('error')

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = {
            email:formData.get('email'),
            password: formData.get('password')
        }

        signIn('credentials', {
            ...data,
            callbackUrl: "/dashboard"
        })
    }
    return (
        <form onSubmit={login} className="flex flex-col items-center justify-center gap-3 bg-gray-300 rounded-lg p-5 shadow-lg">
            <h1 className="text-3xl font-bold">Bem vindo</h1>
            <p className="text-lg">
                Entre utilizando email e senha
            </p>
            <label className="w-full" htmlFor="email">
                <input type="email" className="input input-accent w-full" placeholder="Email" name="email" id="email" />
            </label>
            <label className="w-full" htmlFor="password">
                <input type="password" className="input input-accent w-full" placeholder="Senha" name="password" id="password" />
            </label>
            <button className="btn btn-accent w-full" type="submit">Entrar</button>
            {loginError === 'CredentialsSignin' && <p className="text-red-500">Erro ao realizar o login. Tente novamente.</p>}
        </form>
    )
}