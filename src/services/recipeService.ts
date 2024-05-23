import axios from "axios";
import { CategoriesAPIResponseSchema, DrinkDetailedViewAPIResponseSchema, SearchDrinkAPIResponseSchema } from "../schemas/recipeSchema";
import { DrinkType, SearchFilterType } from "../types";

export async function getCategories() {
  const URL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios(URL);
  const result = CategoriesAPIResponseSchema.safeParse(data);

  if (result.success) return result.data;
}

export async function getRecipes(searchFilter: SearchFilterType) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilter.category}&i=${searchFilter.ingredient}`;
  const { data } = await axios(URL)
  const result = SearchDrinkAPIResponseSchema.safeParse(data)

  if(result.success) return result.data
}

export async function selectRecipe(id: DrinkType["idDrink"]) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios(URL)
  const result = DrinkDetailedViewAPIResponseSchema.safeParse(data.drinks[0])

  if(result.success) return result.data
}