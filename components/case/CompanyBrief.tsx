type Props = {
  name: string;
  lines: string[];
};

export function CompanyBrief({ name, lines }: Props) {
  return (
    <div className="card p-4">
      <h2 className="mb-2 text-h3 text-ink">{name}</h2>
      <div className="space-y-1 text-body text-ash">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
