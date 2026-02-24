type User = {
  id: string;
  name: string;
  avatar: string;
};

type UserFormProps = {
  user: { name: string; avatar: string };
  setUser: React.Dispatch<
    React.SetStateAction<{ name: string; avatar: string }>
  >;
  loading: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  editUser: User | null;
};

const UserForm: React.FC<UserFormProps> = ({
  user,
  setUser,
  loading,
  onSubmit,
  editUser,
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-4 flex gap-2 items-end">
      <div>
        <label className="block text-sm">Nombre</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="border px-2 py-1 rounded"
          placeholder="Nombre"
          required
        />
      </div>
      <div>
        <label className="block text-sm">Avatar (URL)</label>
        <input
          type="url"
          value={user.avatar}
          onChange={(e) => setUser({ ...user, avatar: e.target.value })}
          className="border px-2 py-1 rounded"
          placeholder="https://..."
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-2 rounded"
        disabled={loading}
      >
        {loading
          ? editUser
            ? "Guardando"
            : "Creando..."
          : editUser
            ? "Guardar Cambios"
            : "Crear Usuario"}
      </button>
    </form>
  );
};

export default UserForm;
