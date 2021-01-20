declare interface Navigation {
    goBack: () => void
    navigate: (name: string, params?: { [key: string]: any }) => void
}

declare module "react-redux"
