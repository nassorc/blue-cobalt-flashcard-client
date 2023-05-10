export default function Input(props) {
  const { ...inputProps } = props;
  return (
    <input
      {...inputProps}
      className="my-2 py-3 px-4 border border-black/40 rounded-md"
    />
  );
}
