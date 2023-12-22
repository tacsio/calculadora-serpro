export default function CardHeader({ title, subtitle }) {
  return (
    <div className="px-4 sm:px-0">
      <h3 className="text-base font-semibold leading-7 text-gray-900">
        {title}
      </h3>
      <p className="mt-1 max-w-2xl w-64 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
