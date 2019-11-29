export class Material {
    Id : number;
    Name:string;
    Price:number;
    Description:string;
    images: Array<Images>;
    images_files: File[];
}

export interface Images {
    id: number
    original: string
    small: string
    room_id: number
}
