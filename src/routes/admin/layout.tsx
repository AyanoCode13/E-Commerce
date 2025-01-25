import { component$, Slot } from "@builder.io/qwik";
import AuthNavbar from "~/components/ui/navbars/auth-navbar";

export default component$(() => {
    return <AuthNavbar>
        <Slot/>
    </AuthNavbar>
})