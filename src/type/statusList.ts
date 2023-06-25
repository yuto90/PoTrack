// as const オブジェクトのプロパティ全体をreadonly かつリテラル型として扱う
// todo 変数名と型のネーミングが被ってる
export const STATUS_LIST = {
    BACKLOG: 'BACKLOG',
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED'
} as const;
export type STATUS_LIST = typeof STATUS_LIST[keyof typeof STATUS_LIST];
