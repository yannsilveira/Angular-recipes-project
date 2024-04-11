import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/Shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
    
    recipes: Recipe[] = [
        new Recipe('Banana Split', 
        'A delicious Banana Split', 
        'https://www.comidaereceitas.com.br/wp-content/uploads/2008/05/banana_split.jpg',
         [new Ingredient('Banana', 20), new Ingredient('Cereja', 2)]),
        new Recipe('Feijoada', 
        'Uma deliciosa feijoada para o Domingo', 
        'https://blog.biglar.com.br/wp-content/uploads/2021/10/typical-brazilian-dish-called-feijoada-made-with-black-beans-pork-sausage.jpg', 
        [new Ingredient('Feijão', 10), new Ingredient('Caldo Knorr', 2)]),
        new Recipe('Pizza caseira', 
        'Uma deliciosa pizza caseira', 
        'https://tudodereceitas.com.br/wp-content/uploads/2021/10/Massa-de-pizza-caseira-da-vovo-experimente-fazer-ai-1280x720.jpg', 
        [new Ingredient('Farinha', 1), new Ingredient('Fermento', 2), new Ingredient('Queijo Mussarela', 5)]),
        new Recipe('Pastel caseiro', 
        'Uma deliciosa porção de pasteizinhos', 
        'https://nutripao.com/wp-content/uploads/2022/08/Mini-Pastel-de-Carne-de-Sol.png', 
        [new Ingredient('Massa', 6), new Ingredient('Bacon', 2), new Ingredient('Milho', 3), new Ingredient('Mussarela', 2)]),
      ];

      constructor(private slService: ShoppingListService) {}

      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(idRecipeIndex: number) {
        return this.recipes.slice()[idRecipeIndex];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
}