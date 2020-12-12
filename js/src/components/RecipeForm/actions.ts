import { RecipeFormError } from ".";
import Ingredient from "../../models/Ingredient";

export const DESCRIPTION_CHANGED = "DESCRIPTION_CHANGED";
export const descriptionChanged = (value: string) => ({
  type:  DESCRIPTION_CHANGED,
  value: value,
});

export const SLUG_CHANGED = "SLUG_CHANGED";
export const slugChanged = (value: string) => ({
  type:  SLUG_CHANGED,
  value: value,
});

export const TITLE_CHANGED = "TITLE_CHANGED";
export const titleChanged = (value: string) => ({
  type:  TITLE_CHANGED,
  value: value,
});

export const SUBMIT_RECIPE_FORM = "SUBMIT_RECIPE_FORM";
export const submitRecipeForm = () => ({
  type: SUBMIT_RECIPE_FORM,
});

export const SUBMIT_RECIPE_FAILED = "SUBMIT_RECIPE_FAILED";
export const submitRecipeFailed = (error: RecipeFormError) => ({
  error: error,
  type:  SUBMIT_RECIPE_FAILED,
});

export const SUBMIT_RECIPE_SUCCEEDED = "SUBMIT_RECIPE_SUCCEEDED";
export const submitRecipeSucceeded = () => ({
  type: SUBMIT_RECIPE_SUCCEEDED,
});

export const CUISINE_CHANGED = "CUISINE_CHANGED";
export const cuisineChanged = (value: string) => ({
  type:  CUISINE_CHANGED,
  value: value,
});

export const INSTRUCTION_SETS_TITLE_CHANGED = "INSTRUCTION_SETS_TITLE_CHANGED";
export const instructionSetsTitleChanged = (index: number, value: string) => ({
  type:  INSTRUCTION_SETS_TITLE_CHANGED,
  index: index,
  value: value,
});

export const INSTRUCTION_SETS_ADD_NEW = "INSTRUCTION_SETS_ADD_NEW";
export const instructionSetsAddNew = () => ({
  type: INSTRUCTION_SETS_ADD_NEW,
});

export const INSTRUCTION_SETS_INSTRUCTION_CHANGED = "INSTRUCTION_SETS_INSTRUCTION_CHANGED";
export const instructionSetsInstructionChanged = (index: number, stepIndex: number, value: string) => ({
  type:      INSTRUCTION_SETS_INSTRUCTION_CHANGED,
  index:     index,
  stepIndex: stepIndex,
  value:     value,
});

export const INSTRUCTION_SETS_INSTRUCTION_ADD_NEW = "INSTRUCTION_SETS_INSTRUCTION_ADD_NEW";
export const instructionSetsInstructionAddNew = (index: number) => ({
  type:  INSTRUCTION_SETS_INSTRUCTION_ADD_NEW,
  index: index,
});

export const INSTRUCTION_SETS_INSTRUCTION_DELETED = "INSTRUCTION_SETS_INSTRUCTION_DELETED";
export const instructionSetsInstructionDeleted = (index: number, stepIndex: number) => ({
  type:      INSTRUCTION_SETS_INSTRUCTION_DELETED,
  index:     index,
  stepIndex: stepIndex,
});

export const INGREDIENT_QUERY_CHANGED = "INGREDIENT_QUERY_CHANGED";
export const ingredientQueryChanged = (value: string) => ({
  type:  INGREDIENT_QUERY_CHANGED,
  value: value,
});

export const INGREDIENT_MODAL_CLOSED = "INGREDIENT_MODAL_CLOSED";
export const ingredientModalClosed = () => ({
  type: INGREDIENT_MODAL_CLOSED,
});

export const INGREDIENT_GROUP_TITLE_CHANGED = "INGREDIENT_GROUP_TITLE_CHANGED";
export const ingredientGroupTitleChanged = (index: number, value: string) => ({
  type:  INGREDIENT_GROUP_TITLE_CHANGED,
  index: index,
  value: value,
});

export const INGREDIENT_GROUP_INGREDIENT_QUANTITY_DELETED = "INGREDIENT_GROUP_INGREDIENT_QUANTITY_DELETED";
export const ingredientGroupIngredientQuantityDeleted = (index: number, stepIndex: number) => ({
  type:      INGREDIENT_GROUP_INGREDIENT_QUANTITY_DELETED,
  index:     index,
  stepIndex: stepIndex,
});

export const INGREDIENT_GROUP_INGREDIENT_QUANTITY_ADD_NEW = "INGREDIENT_GROUP_INGREDIENT_QUANTITY_ADD_NEW";
export const ingredientGroupIngredientQuantityAddNew = (index: number) => ({
  type:  INGREDIENT_GROUP_INGREDIENT_QUANTITY_ADD_NEW,
  index: index,
});

export const INGREDIENT_GROUPS_ADD_NEW = "INGREDIENT_GROUPS_ADD_NEW";
export const ingredientGroupsAddNew = () => ({
  type: INGREDIENT_GROUPS_ADD_NEW,
});

export const INGREDIENT_QUERY_SUBMITTED = "INGREDIENT_QUERY_SUBMITTED";
export const ingredientQuerySubmitted = () => ({
  type: INGREDIENT_QUERY_SUBMITTED,
});

export const INGREDIENT_QUERY_SUCCEEDED = "INGREDIENT_QUERY_SUCCEEDED";
export const ingredientQuerySucceeded = (ingredients: Ingredient[]) => ({
  type:        INGREDIENT_QUERY_SUCCEEDED,
  ingredients: ingredients,
});

export const INGREDIENT_QUERY_FAILED = "INGREDIENT_QUERY_FAILED";
export const ingredientQueryFailed = () => ({
  type: INGREDIENT_QUERY_FAILED,
});

export const INGREDIENT_QUERY_RESULT_SELECTED = "INGREDIENT_QUERY_RESULT_SELECTED";
export const ingredientQueryResultSelected = (ingredient: Ingredient) => ({
  type:       INGREDIENT_QUERY_RESULT_SELECTED,
  ingredient: ingredient,
});

export const INGREDIENT_QUANTITY_CHANGED = "INGREDIENT_QUANTITY_CHANGED";
export const ingredientQuantityChanged = (value: string) => ({
  type:  INGREDIENT_QUANTITY_CHANGED,
  value: value,
});

export const ADD_INGREDIENT_MODAL_SUBMITTED = "ADD_INGREDIENT_MODAL_SUBMITTED";
export const addIngredientModalSubmitted = () => ({
  type: ADD_INGREDIENT_MODAL_SUBMITTED,
});

export const INGREDIENT_QUANTITY_TYPE_CHANGED = "INGREDIENT_QUANTITY_TYPE_CHANGED";
export const ingredientQuantityTypeChanged = (value: string) => ({
  type:  INGREDIENT_QUANTITY_TYPE_CHANGED,
  value: value,
});
