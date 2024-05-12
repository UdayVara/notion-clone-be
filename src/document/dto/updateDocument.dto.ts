import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class updateDocument{
    
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    content:string;

    @IsNotEmpty()
    @IsBoolean()
    isArchived:boolean;


    parentDocument?:string;

    coverImage?:string;

    icons?:string;

    isPublished?:boolean;
}