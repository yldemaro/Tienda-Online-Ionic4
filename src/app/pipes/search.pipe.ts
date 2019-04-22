import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productos: any, texto: any): any {

    if (texto.length === 0) { return productos; }

    return productos.filter(usuario => {
      return usuario.payload.doc.data().title.toLocaleLowerCase().includes(texto);
    });
  }

}
