import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import LogoutButton from "../../components/LogoutButton"

export default async function Page() {
    const session = await getServerSession()
    if(!session) {
        redirect('/')
    }

    return (
        <div>
            <div>Bem vindo ao dashboard</div>
            <div>Olá, {session?.user?.name}!</div>
            <LogoutButton />
        </div>
    )
}