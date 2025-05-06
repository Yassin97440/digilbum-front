export interface ItemListAction {
    actionNamr: string,
    resource: string,
    title: string,
    icon: string,
    action?: (...args: any[]) => any
}