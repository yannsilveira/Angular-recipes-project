import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Banana Split', 'A delicious Banana Split', 'https://www.comidaereceitas.com.br/wp-content/uploads/2008/05/banana_split.jpg'),
    new Recipe('Feijoada', 'Uma deliciosa feijoada para o Domingo', 'https://blog.biglar.com.br/wp-content/uploads/2021/10/typical-brazilian-dish-called-feijoada-made-with-black-beans-pork-sausage.jpg'),
    new Recipe('Pizza caseira', 'Uma deliciosa pizza caseira', 'https://tudodereceitas.com.br/wp-content/uploads/2021/10/Massa-de-pizza-caseira-da-vovo-experimente-fazer-ai-1280x720.jpg'),
    new Recipe('Pastel caseiro', 'Uma deliciosa porção de pasteizinhos', 'https://nutripao.com/wp-content/uploads/2022/08/Mini-Pastel-de-Carne-de-Sol.png'),
  ];

  ngOnInit(): void {
    
  }

}
