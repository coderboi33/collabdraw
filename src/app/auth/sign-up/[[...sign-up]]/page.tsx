import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <section>
            <div>
                <SignUp forceRedirectUrl={'/dashboard'} />
            </div>
        </section>
    )
}