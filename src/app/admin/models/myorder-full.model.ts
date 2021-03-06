export interface MyorderFull {
  category: string,
  delivaryAddress: string,
  orderId: string,
  paymentType: string,
  product: string,
  productID: string,
  quantity: number,
  toPay: number,
  status? :string,
  orderPlacedTime? : any,
  price : number,
  myproductId : string,
  ordered : number,
  shipped : number,
  nearby : number,
  delivered : number,
  cancelled : number,
}
