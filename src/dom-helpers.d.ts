declare module "dom-helpers" {

}

declare module "dom-helpers/ownerDocument" {
  const func: (el: Element)=> Document;
  export default func;
}
