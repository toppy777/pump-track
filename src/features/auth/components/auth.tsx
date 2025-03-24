import { auth } from "@/features/auth/config"
import SignIn from "./sign-in"
import SignOut from "./sign-out"

export default async function Auth() {
    const session = await auth()
    if (!session) {
        return <SignIn />
    }

    return(
        <div>
            <SignOut />
        </div>
    )
}