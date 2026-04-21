type StatsCardProps = {
  title: string;
  value: number;
  description?: string;
};

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      {description ? (
        <p className="mt-2 text-xs text-zinc-500">{description}</p>
      ) : null}
    </article>
  );
}