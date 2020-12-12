import IngredientGroup from "./IngredientGroup";
import InstructionSet from "./InstructionSet";

class Recipe {
  cuisine:          string;
  description:      string;
  title:            string;
  slug:             string;
  instructionSets:  InstructionSet[];
  ingredientGroups: IngredientGroup[];

  public constructor(values: {[index: string]: any;}) {
    this.cuisine         = values.cuisine;
    this.description     = values.description;
    this.slug            = values.slug;
    this.title           = values.title;
    this.instructionSets = values.instructionSets.map((v: any) => (new InstructionSet(v)));
    this.ingredientGroups = values.ingredientGroups.map((v: any) => (new IngredientGroup(v)));
  }

  JSON(): {[index: string]: any;}  {
    return {
      cuisine:         this.cuisine,
      description:     this.description,
      slug:            this.slug,
      title:           this.title,
      instructionSets: this.instructionSets.map((v: InstructionSet) => v.JSON()),
      ingredientGroups: this.ingredientGroups.map((v: IngredientGroup) => v.JSON()),
    };
  }
}

export default Recipe;
