import { component$, type QRL, $, Slot, type ClassList, type Signal } from "@builder.io/qwik";

import { type ActionStore, Form } from "@builder.io/qwik-city";

type FormProps<I,O> = {
    action: ActionStore<O, I, boolean>
    submit: QRL<SubmitEvent>
    cls:ClassList | Signal<ClassList>
}

export default component$(({action, submit, cls}:FormProps<any, any>) => {
    return <Form action={action} onSubmit$={$((event) => submit(event))} class={cls}>
        <Slot />
    </Form>
})