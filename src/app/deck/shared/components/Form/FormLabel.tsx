export default function FormLabel({ text, desc }) {
  return (
    <p className="mb-4 text-slate-600 font-semibold w-full block border-b border-slate-600">
      <p className="text-lg">{text}</p>
      <p className="text-black/90 text-md font-normal">{desc}</p>
    </p>
  );
}
