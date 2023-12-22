export default function CardItem({ title, value, colorClass = "" }) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">{title}</dt>
      <dd
        className={
          "mt-1 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0 " +
          colorClass
        }
      >
        {value}
      </dd>
    </div>
  );
}
