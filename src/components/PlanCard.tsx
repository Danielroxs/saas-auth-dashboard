import type { Plan } from "../features/plans/types";

interface PlanCardProps {
  plan: Plan;
  onEdit: (plan: Plan) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export default function PlanCard({
  plan,
  onEdit,
  onDelete,
  isAdmin,
}: PlanCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 min-w-xs">
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="text-2xl font-bold text-blue-600 mt-2">${plan.price}/mes</p>
      <p className="text-gray-600 text-sm mt-2">{plan.description}</p>

      <ul className="mt-3 text-sm text-gray-700">
        {plan.features.map((feature, idx) => (
          <li key={idx}>✓ {feature}</li>
        ))}
      </ul>

      {isAdmin && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(plan)}
            className="bg-yellow-500 text-white px-3 py-1 text-sm"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(plan.id)}
            className="bg-red-600 text-white px-3 py-1 text-sm"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
