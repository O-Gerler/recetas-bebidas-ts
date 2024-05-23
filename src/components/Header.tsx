import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const [searchFilters, setSearchFilter] = useState({
    ingredient: "",
    category: "",
  });
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const categories = useAppStore((state) => state.categories);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const searchRecepies = useAppStore((state) => state.searchRecipes);
  const showNotification = useAppStore(state => state.showNotification)

  useEffect(() => {
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchFilter({
      ...searchFilters,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilters).includes("")) {
      showNotification({ text: "Todos los campos deben ser rellenado", error: true })
      console.log("Todos los campos deben ser rellenados");
      return;
    }

    searchRecepies(searchFilters);
  };

  return (
    <header
      className={
        isHome ? "bg-header bg-center bg-cover bg-fixed" : "bg-slate-800"
      }
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" className="w-32" alt="logotipo" />
          </div>
          <nav className="text-white uppercase font-bold flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-orange-400" : "")}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) => (isActive ? "text-orange-400" : "")}
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o ingredientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Vodka, Tequila, Café, etc..."
                value={searchFilters.ingredient}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                value={searchFilters.category}
                onChange={handleChange}
              >
                <option value=""> -- Seleccione -- </option>
                {categories &&
                  categories.drinks.map((drink) => (
                    <option key={drink.strCategory} value={drink.strCategory}>
                      {drink.strCategory}
                    </option>
                  ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
}
