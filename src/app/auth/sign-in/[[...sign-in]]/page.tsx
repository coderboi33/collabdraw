
import { SignIn } from '@clerk/nextjs'

export default function Page() {


    return (
        <section>
            <div>
                <SignIn forceRedirectUrl={'/dashboard'} />
            </div>
        </section>
    )
}