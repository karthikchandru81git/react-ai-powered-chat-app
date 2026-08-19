import { Dialog } from "radix-ui";

function DialogPreview({ open, onOpenChange }) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>

            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Description className="DialogDescription">
                        <p>ChatCraft is an AI-powered conversational application designed to deliver fast, intuitive, and context-aware interactions. It features a responsive user experience, seamless real-time messaging, and a scalable frontend architecture focused on performance, usability, and maintainability.</p>
                        <ul className="list-disc list-inside flex flex-col gap-3 mt-5">
                        <li>React — Frontend UI</li>
                        <li>TypeScript — Type-safe development</li>
                        <li>Tailwind CSS — Styling</li>
                        <li>Groq API — LLM/API integration</li>
                        <li>Llama / supported Groq model — AI responses</li>
                        <li>Authentication — Login/session management</li>
                        <li>Vite — Development/build tooling</li>
                        </ul>
                    </Dialog.Description>

                    <Dialog.Close asChild>
                        {/* <button className="IconButton" aria-label="Close">
                            Close
                        </button> */}
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default DialogPreview