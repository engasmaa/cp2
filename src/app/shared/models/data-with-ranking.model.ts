export class DataWithRanking <T>{
    result: T[];
    paginator : IPaginator
    length:number;
}
export interface IPaginator{
    offset: number;
    limit: number;
}