import { IsBoolean, IsNotEmpty } from "class-validator";


export class archieveDocumentDto{

    @IsNotEmpty()
    @IsBoolean()
    isArchieve:boolean


}