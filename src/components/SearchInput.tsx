type SearchInputProps = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Buscar usuario..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border px-2 py-1 rounded mb-4"
  />
);

export default SearchInput;
