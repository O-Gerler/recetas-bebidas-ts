import { z } from "zod";
import { CategoriesAPIResponseSchema, DrinkApiResponseSchema, DrinkDetailedViewAPIResponseSchema, SearchDrinkAPIResponseSchema, SearchFilterSchema } from "../schemas/recipeSchema";

export type CategoriesType = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilterType = z.infer<typeof SearchFilterSchema>
export type DrinksType = z.infer<typeof SearchDrinkAPIResponseSchema>
export type DrinkType = z.infer<typeof DrinkApiResponseSchema>
export type RecepieType = z.infer<typeof DrinkDetailedViewAPIResponseSchema>
export type NotificacionType = {
  text: string
  error: boolean
  show: boolean
}