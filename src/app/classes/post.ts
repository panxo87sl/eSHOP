export class Post {
    _id: string;
    titulo: string;
    contenido: string;
    fecha: Date;
    file: File;
    progress:number;
    precio:string;
    name:string;
    url:string;
    $key:string;

    constructor(file:File) {
        this.file = file;
      }
}