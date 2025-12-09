// Declare CSS module for TS
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}