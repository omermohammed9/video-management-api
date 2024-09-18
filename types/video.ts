export interface Video {
    id: string;
    title: string;
    description?: string;
    uploadDate: Date;
    fileSize: number;
    duration?: number
    path: string;
}
