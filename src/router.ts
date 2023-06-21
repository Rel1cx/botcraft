import { createGroup, createRouter } from "@swan-io/chicane"

const routes = {
    // bot list
    Home: "/",
    NotFound: "/404",
    ...createGroup("Bot", "/bots/:botName", {
        // Bot layout
        Area: "/*",
        // Chat list
        Root: "/",
        // Chat detail
        Chat: "/:chatID",
        // New chat
        NewChat: "/new",
        // Bot settings
        Settings: "/settings",
        // TODO: Implement chat archive page
        // Archived chat list
        ChatArchive: "/archive",
    }),
    // TODO: Implement workflow pages
    ...createGroup("Workflow", "/workflows", {
        // Workflow layout
        Area: "/*",
        // Workflow list
        Root: "/",
        // Workflow detail
        Workflow: "/:workflowID",
    }),
} as const

export const Router = createRouter(routes)
