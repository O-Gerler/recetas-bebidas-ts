import { useAppStore } from "../stores/useAppStore";
import { DrinkType } from "../types";

type DrinkCardProps = {
  drink: DrinkType;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
  const selectRecepie = useAppStore((state) => state.selectRecipie);

  const handleClick = () => {
    selectRecepie(drink.idDrink);
  };

  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
          className="hover:scale-110 transition-transform"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          onClick={handleClick}
          type="button"
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
}
