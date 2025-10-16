export default function VariableTypes() {
  const numberVariable: number = 123;
  const floatingPointNumber: number = 3.14159;
  const stringVariable: string = "Hello";
  const booleanVariable: boolean = true;

  const isNumber = typeof numberVariable === "number";
  const isString = typeof stringVariable === "string";
  const isBoolean = typeof booleanVariable === "boolean";

  return (
    <div id="wd-variable-types">
      <h4>Variable Types</h4>
      <div>numberVariable = {numberVariable}</div>
      <div>floatingPointNumber = {floatingPointNumber}</div>
      <div>stringVariable = {stringVariable}</div>
      <div>booleanVariable = {String(booleanVariable)}</div>
      <hr />
      <div>isNumber = {String(isNumber)}</div>
      <div>isString = {String(isString)}</div>
      <div>isBoolean = {String(isBoolean)}</div>
    </div>
  );
}

