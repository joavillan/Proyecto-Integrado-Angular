export class RecetaModel{
    id:string;
    titulo:string;
    subtitulo: string;
    userId:string;
    categoria:string;
    cuerpo:string;
    comentarios:[{}];
    img:string;
    fecha:string;
    mg:number;
    mgs:[{}];

    constructor(id,titulo,subtitulo,userId,categoria,cuerpo,comentarios?,img?,fecha?,mg?,mgs?){
        this.id = id;
        this.titulo=titulo;
        this.subtitulo=subtitulo;
        this.userId=userId;
        this.categoria=categoria;
        this.cuerpo=cuerpo;
        this.comentarios=comentarios;
        this.img=img;
        this.fecha=fecha;
        this.mg=mg;
        this.mgs=mgs;
    }

}