export function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="glass-card p-4">
          <div className="skeleton h-48 w-full" />
          <div className="skeleton mt-3 h-4 w-2/3" />
          <div className="skeleton mt-2 h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}
