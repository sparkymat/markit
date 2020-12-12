import Ingredient from "./Ingredient";
import Quantity from "./Quantity";

class IngredientQuantity {
  ingredient: Ingredient;
  quantity:   Quantity;

  public constructor(values: {[index: string]: any;}) {
    this.ingredient = new Ingredient(values.ingredient);
    this.quantity   = new Quantity(values.quantity);
  }

  JSON(): {[index: string]: any;} {
    return {
      ingredient: this.ingredient,
      quantity:   this.quantity,
    };
  }

  render(): string {
    return `${this.ingredient.title} - ${this.quantity.render()}`;
  }
}

export default IngredientQuantity;
