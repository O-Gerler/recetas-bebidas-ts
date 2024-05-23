import { StateCreator } from "zustand"
import { getCategories, getRecipes, selectRecipe } from "../services/recipeService"
import { CategoriesType, DrinksType, DrinkType, RecepieType, SearchFilterType } from "../types"

export type RecipesSliceType = {
  categories: CategoriesType,
  drinks: DrinksType
  selectedRecepie: RecepieType
  modal: boolean
  fetchCategories: () => Promise<void>
  searchRecipes: (searchFilter: SearchFilterType) => Promise<void>
  selectRecipie: (id: DrinkType["idDrink"]) => Promise<void>
  closeModal: () => void
}

export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  drinks: {
    drinks: []
  },
  selectedRecepie: {} as RecepieType,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories
    })
  },
  searchRecipes: async (searchFilter) => {
    const drinks = await getRecipes(searchFilter)
    set({
      drinks
    })
  },
  selectRecipie: async (id) => {
    const selectedRecepie = await selectRecipe(id)
    set({
      selectedRecepie,
      modal: true
    })
  },
  closeModal: () => set({
    selectedRecepie: {} as RecepieType,
    modal: false
  })
})