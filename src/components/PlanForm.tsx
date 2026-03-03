import { useState } from "react";
import type { Plan } from "../features/plans/types";

interface PlanFormProps {
  plan: Omit<Plan, "id"> | null;
  onSubmit: (plan: Omit<Plan, "id">) => void;
  loading: boolean;
}

export default function PlanForm({ plan, onSubmit, loading }: PlanFormProps) {
  const [name, setName] = useState(plan?.name ?? "");
  const [price, setPrice] = useState(plan?.price ? String(plan.price) : "");
  const [description, setDescription] = useState(plan?.description ?? "");
  const [features, setFeatures] = useState(plan?.features ?? []);
  const [newFeature, setNewFeature] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, price: Number(price) || 0, description, features });

    setName("");
    setPrice("");
    setDescription("");
    setFeatures([]);
    setNewFeature("");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
      <h3 className="text-xl font-bold mb-4">
        {plan ? "Editar Plan" : "Crear Nuevo Plan"}
      </h3>

      <div className="mb-4">
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label>Precio ($/mes)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label>Descripcion</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label>Features</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Agregar feature"
            className="border px-2 py-1 flex-1"
          />
          <button
            type="button"
            onClick={() => {
              if (newFeature) {
                setFeatures([...features, newFeature]);
                setNewFeature("");
              }
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Agregar
          </button>
        </div>

        <ul>
          {features.map((feature, idx) => (
            <li key={idx} className="flex justify-between">
              <span>✓ {feature}</span>
              <button
                type="button"
                onClick={() =>
                  setFeatures(features.filter((_, i) => i !== idx))
                }
                className="text-red-500 text-sm"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Guardando..." : "Guardar Plan"}
      </button>
    </form>
  );
}
