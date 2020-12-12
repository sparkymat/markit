import IngredientQuantity from "./IngredientQuantity";

class IngredientGroup {
  title:                string;
  ingredientQuantities: IngredientQuantity[];

  public constructor(values: {[index: string]: any;}) {
    this.title        = values.title;
    this.ingredientQuantities = values.ingredientQuantities.map((v: any) => (new IngredientQuantity(v)));
  }

  JSON(): {[index: string]: any;}  {
    return {
      title:                this.title,
      ingredientQuantities: this.ingredientQuantities.map((v: IngredientQuantity) => v.JSON()),
    };
  }
}

export default IngredientGroup;
