const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Loading">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-24 animate-pulse rounded-xl bg-slate-200" />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
