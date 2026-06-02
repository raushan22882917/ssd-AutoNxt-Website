

function SectionSkeleton() {
  return (
    <div className="w-full py-12">
      <div className="animate-pulse">

        {/* Title */}
        <div className="h-8 w-64 rounded bg-muted mb-6" />

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="h-56 rounded-xl bg-muted" />
          <div className="h-56 rounded-xl bg-muted" />
          <div className="h-56 rounded-xl bg-muted" />
        </div>

      </div>
    </div>
  );
}

export default SectionSkeleton;