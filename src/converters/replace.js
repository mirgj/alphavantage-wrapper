export default (value, context) => {
  if (!value) throw new Error(`The provided value is not valid: ${value}`);
  if (!context) throw new Error(`context is required`);
  if (!context.from) throw new Error(`context.from is required`);
  if (!context.to) throw new Error(`context.to is required`);

  return value.split(context.from).join(context.to);
};
