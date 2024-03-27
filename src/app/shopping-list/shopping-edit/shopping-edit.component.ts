import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../Shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.slService.startedEditing.subscribe((index: number) => {
      this.editItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient); 
    }
    this.editMode = false;
    form.resetForm();
  }

  onClear() {
    this.slForm.resetForm();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}
