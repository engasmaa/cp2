import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Filter'
})

export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {

debugger;
      let rVal = 
                    
                 (val.title.toLocaleLowerCase().includes(args)) 
                 || (val.titleAr.toLocaleLowerCase().includes(args))
                 || (val.artist.name.toLocaleLowerCase().includes(args))
                 || (val.language.title.toLocaleLowerCase().includes(args))
                 || (val.language.title.toLocaleLowerCase().includes(args))
                 || (val.albumCategory.title.toLocaleLowerCase().includes(args))
                //  ||  (val.realeaseDate.toString.toLocaleLowerCase().includes(args))
                //  ||
                //  (val.titleAr.toLocaleLowerCase().includes(args)) ||
                //  (val.extension.toLocaleLowerCase().includes(args)) ||
                //  (val.artist.name.toLocaleLowerCase().includes(args))
                //   ||

                //  (val.title.toLocaleLowerCase().includes(args)) ||
                //  (val.title.toLocaleLowerCase().includes(args)) ||
                //  (val.title.toLocaleLowerCase().includes(args)) ||
                //  (val.title.toLocaleLowerCase().includes(args)) ||
                 ;


      return rVal;
    })
  }
}