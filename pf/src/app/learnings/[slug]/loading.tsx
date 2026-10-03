const block = "animate-pulse rounded-md bg-elevated motion-reduce:animate-none";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading article" className="container-page max-w-4xl pb-section pt-28 md:pt-32">
      <div className={`${block} mb-10 h-4 w-28`} />
      <div className={`${block} h-3 w-48`} />
      <div className={`${block} mt-6 h-16 w-3/4`} />
      <div className={`${block} mt-6 h-6 w-2/3`} />
      <div className={`${block} mt-10 h-24 w-full rounded-lg`} />
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`${block} h-36 rounded-lg`} />
        ))}
      </div>
    </div>
  );
}
