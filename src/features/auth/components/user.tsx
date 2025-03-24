import { auth } from "@/features/auth/config"
import SignIn from "@/features/auth/components/sign-in"
import SignOut from "@/features/auth/components/sign-out"
import UserAvatar from "@/features/auth/components/user-avatar"

export default async function User(){
    const session = await auth()
    if (!session) {
        return <SignIn />
    }

    return(
        <div>
            <UserAvatar />
            <p>Name: {session && session.user ? session.user.name : ""}</p>
            <p>Email: {session && session.user ? session.user.email : ""}</p>
            <SignOut />
        </div>
    )
}