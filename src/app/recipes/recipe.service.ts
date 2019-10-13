import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    /*private recipes: Recipe[] = [
        new Recipe(
            'Schnitzel',
            'This is test',
            'http://www.seriouseats.com/recipes/assets_c/2016/05/20160503-fava-carrot-ricotta-salad-recipe-1-thumb-1500xauto-431710.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French fries', 20)
            ]),
        new Recipe(
            'Burger',
            'This is test',
            'http://www.seriouseats.com/assets_c/2012/07/20120717-BK-BBQ-Sandwiches-thumb-625xauto-257310.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]),
        new Recipe(
            'Big fat burger',
            'This is test',
            'http://bk-apac-prd.s3.amazonaws.com/sites/burgerking.co.nz/files/BUR2336D_Crunchy_BBQ_Bacon_Whopper_500x400.png',
            [
                new Ingredient('Large Buns', 2),
                new Ingredient('Veggie patty', 1)
            ])
    ];*/

    private recipes: Recipe[] = [];
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    constructor(private slService: ShoppingListService,
                private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {

    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.getRecipes());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.getRecipes());
    }
}