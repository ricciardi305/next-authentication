'use client'

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

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
        <div className="flex flex-col items-center justify-center gap-3 bg-gray-300 rounded-lg p-5 shadow-lg">
            <h1 className="text-3xl font-bold">Bem vindo</h1>
            <p className="text-lg">
                Entre utilizando email e senha
            </p>
            <form onSubmit={login} className="flex flex-col items-center justify-center gap-3">
                <label className="w-full" htmlFor="email">
                    <input type="email" className="input input-accent w-full" placeholder="Email" name="email" id="email" />
                </label>
                <label className="w-full" htmlFor="password">
                    <input type="password" className="input input-accent w-full" placeholder="Senha" name="password" id="password" />
                </label>
                <button className="btn btn-accent w-full" type="submit">Entrar</button>
            </form>
            <div className="flex mt-3 w-full gap-3 items-center justify-center">
                <p>Ou entre com</p>
                <button className="w-10 h-10 bg-[#00d3be] rounded-lg flex items-center justify-center" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
                    <FaGoogle />
                </button>
                <button className="w-10 h-10 bg-[#00d3be] rounded-lg flex items-center justify-center">
                    <FaGithub />
                </button>
            </div>
            {loginError === 'CredentialsSignin' && <p className="text-red-500">Erro ao realizar o login. Tente novamente.</p>}
        </div>
    )
}