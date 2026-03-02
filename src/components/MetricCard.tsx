interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: string;
  bgColor?: string;
}

export default function MetricCard({
  label,
  value,
  icon = "📊",
  bgColor = "bg-blue-50",
}: MetricCardProps) {
  return (
    <div className={`${bgColor} p-6 rounded-lg border border-gray-200`}>
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
