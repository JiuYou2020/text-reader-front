export interface Book {
    id: string;
    name: string;
    description?: string; // 添加 description 字段
    size?: number;
    syncedToCloud?: boolean;
    lastReadPosition?: number;
    localUri?: string;
}
