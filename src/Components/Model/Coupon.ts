export class Coupon{
    public id:number;
    public companyid:number;
    public categoryid:number;
    public title:string;
    public description:string;
    public start_date:string;
    public end_date:string;
    public amount:number;
    public price:number;
    public image:string;

    constructor(id:number,companyid:number,categoryid:number,title:string,description:string,start_date:string,end_date:string,amount:number,price:number,image:string){
        this.id=id;
        this.companyid=companyid;
        this.categoryid=categoryid;
        this.title=title;
        this.description=description;
        this.start_date=start_date;
        this.end_date=end_date;
        this.amount=amount;
        this.price=price;
        this.image=image;
    }
}