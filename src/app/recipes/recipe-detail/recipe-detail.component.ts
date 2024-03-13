import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  idRecipe: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idRecipe = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.idRecipe);
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['shopping-list'])
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

}
