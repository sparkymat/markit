import { merge } from "lodash";
import Recipe from "../../models/Recipe";
import { RecipeFormError } from ".";
import {
  CUISINE_CHANGED,
  DESCRIPTION_CHANGED,
  INGREDIENT_GROUPS_ADD_NEW,
  INGREDIENT_GROUP_TITLE_CHANGED,
  INGREDIENT_MODAL_CLOSED,
  INGREDIENT_QUERY_CHANGED,
  INSTRUCTION_SETS_ADD_NEW,
  INSTRUCTION_SETS_TITLE_CHANGED,
  INSTRUCTION_SETS_INSTRUCTION_CHANGED,
  INSTRUCTION_SETS_INSTRUCTION_ADD_NEW,
  INSTRUCTION_SETS_INSTRUCTION_DELETED,
  SLUG_CHANGED,
  SUBMIT_RECIPE_FAILED,
  TITLE_CHANGED,
  INGREDIENT_GROUP_INGREDIENT_QUANTITY_ADD_NEW,
  INGREDIENT_QUERY_SUCCEEDED,
  INGREDIENT_QUERY_FAILED,
  INGREDIENT_QUERY_RESULT_SELECTED,
  INGREDIENT_QUANTITY_CHANGED,
  ADD_INGREDIENT_MODAL_SUBMITTED,
  INGREDIENT_QUANTITY_TYPE_CHANGED,
} from "./actions";
import IngredientGroup from "../../models/IngredientGroup";
import InstructionSet from "../../models/InstructionSet";
import Ingredient from "../../models/Ingredient";
import IngredientQuantity from "../../models/IngredientQuantity";

export interface RecipeFormState {
  cuisine:                       string,
  currentIngredientGroupIndex:   number | undefined,
  description:                   string,
  slug:                          string;
  title:                         string;
  ingredientQuery:               string;
  ingredientQueryResults:        Ingredient[];
  ingredientQuerySelectedResult: Ingredient | undefined;
  ingredientQuantity:            string;
  ingredientQuantityType:        string;
  ingredientModalOpen:           boolean;
  ingredientGroups:              IngredientGroup[];
  instructionSets:               InstructionSet[];
  formError:                     RecipeFormError | null;
}

const RECIPE_FORM_STATE_INITIAL: RecipeFormState = {
  cuisine:                       "",
  currentIngredientGroupIndex:   undefined,
  description:                   "",
  slug:                          "",
  title:                         "",
  ingredientQuery:               "",
  ingredientQueryResults:        [],
  ingredientQuerySelectedResult: undefined,
  ingredientQuantity:            "",
  ingredientQuantityType:        "",
  ingredientModalOpen:           false,
  ingredientGroups:              [],
  instructionSets:               [],
  formError:                     null,
};

export const RecipeFromFormState = (state: RecipeFormState): Recipe => {
  var r = new Recipe(state);

  return r;
};

export const RecipeFormReducer = (state: RecipeFormState = RECIPE_FORM_STATE_INITIAL, action: any): RecipeFormState => {
  switch(action.type) {
    case CUISINE_CHANGED:
      return merge({}, state, {
        cuisine: action.value,
      });
    case DESCRIPTION_CHANGED:
      return merge({}, state, {
        description: action.value,
      });
    case TITLE_CHANGED:
      return merge({}, state, {
        title: action.value,
      });
    case INGREDIENT_QUERY_CHANGED:
      return merge({}, state, {
        ingredientQuery: action.value,
      });
    case INGREDIENT_GROUP_INGREDIENT_QUANTITY_ADD_NEW:
      return merge({}, state, {
        ingredientModalOpen:         true,
        currentIngredientGroupIndex: action.index,
      });
    case INGREDIENT_MODAL_CLOSED:
      return merge({}, state, {
        ingredientModalOpen:         false,
        currentIngredientGroupIndex: undefined,
      });
    case SLUG_CHANGED:
      {
        const cleanedUpSlug = action.value.replace(/[^a-z0-9-]/g,"");
        return merge({}, state, {
          slug: cleanedUpSlug,
        });
      }
    case SUBMIT_RECIPE_FAILED:
      return merge({}, state, {
        formError: null,
      }, {
        formError: action.error,
      });
    case INSTRUCTION_SETS_ADD_NEW:
      {
        var instructionSets = merge([], state.instructionSets);
        instructionSets.push(new InstructionSet({title: "", instructions: []}));
        return merge({}, state, {
          instructionSets: instructionSets,
        });
      }
    case INGREDIENT_GROUPS_ADD_NEW:
      {
        var ingredientGroups = merge([], state.ingredientGroups);
        ingredientGroups.push(new IngredientGroup({title: "", ingredientQuantities: []}));
        return merge({}, state, {
          ingredientGroups: ingredientGroups,
        });
      }
    case INSTRUCTION_SETS_TITLE_CHANGED:
      {
        var instructionSets = merge([], state.instructionSets);
        var currentInstructionSet = instructionSets[action.index] as InstructionSet;
        currentInstructionSet.title = action.value;
        return merge({}, state, {
          instructionSets: instructionSets,
        });
      }
    case INGREDIENT_GROUP_TITLE_CHANGED:
      {
        var ingredientGroups = merge([], state.ingredientGroups);
        var currentIngredientGroup = ingredientGroups[action.index] as IngredientGroup;
        currentIngredientGroup.title = action.value;
        return merge({}, state, {
          ingredientGroups: ingredientGroups,
        });
      }
    case INSTRUCTION_SETS_INSTRUCTION_CHANGED:
      {
        var instructionSets = merge([], state.instructionSets);
        var currentInstructionSet = instructionSets[action.index] as InstructionSet;
        currentInstructionSet.instructions[action.stepIndex] = action.value;
        return merge({}, state, {
          instructionSets: instructionSets,
        });
      }
    case ADD_INGREDIENT_MODAL_SUBMITTED:
      {
        var ingredientGroups = merge([], state.ingredientGroups);
        if (state.currentIngredientGroupIndex !== undefined && state.ingredientQuerySelectedResult !== undefined && state.ingredientQuantityType !== "") {
          var currentIngredientGroup = ingredientGroups[state.currentIngredientGroupIndex] as IngredientGroup;
          var ingredientQuantities = merge([], currentIngredientGroup.ingredientQuantities);
          ingredientQuantities.push(new IngredientQuantity({
            ingredient: {
              title: state.ingredientQuerySelectedResult.title,
              id:    state.ingredientQuerySelectedResult.id,
            },
            quantity: {
              value:        state.ingredientQuantity,
              quantityType: state.ingredientQuantityType,
            },
          }));
          currentIngredientGroup.ingredientQuantities = ingredientQuantities;
        }
        return merge({}, state, {
          ingredientQueryResults:        null,
          ingredientQuerySelectedResult: null,
          currentIngredientGroupIndex:   null,
        }, {
          ingredientGroups:              ingredientGroups,
          ingredientQueryResults:        [],
          ingredientModalOpen:           false,
          currentIngredientGroupIndex:   undefined,
          ingredientQuantity:            "",
          ingredientQuantityType:        "",
          ingredientQuerySelectedResult: undefined,
        });
      }
    case INSTRUCTION_SETS_INSTRUCTION_ADD_NEW:
      {
        var instructionSets = merge([], state.instructionSets);
        var currentInstructionSet = instructionSets[action.index] as InstructionSet;
        var instructions = merge([], currentInstructionSet.instructions);
        instructions.push("");
        currentInstructionSet.instructions = instructions;
        return merge({}, state, {
          instructionSets: instructionSets,
        });
      }
    case INSTRUCTION_SETS_INSTRUCTION_DELETED:
      {
        var instructionSets = merge([], state.instructionSets);
        var currentInstructionSet = instructionSets[action.index] as InstructionSet;
        currentInstructionSet.instructions = currentInstructionSet.instructions.filter((step,i) => i != action.stepIndex);
        return merge({}, state, {
          instructionSets: instructionSets,
        });
      }
    case INGREDIENT_QUERY_SUCCEEDED:
      return merge({}, state, {
        ingredientQueryResults:        action.ingredients,
        ingredientQuerySelectedResult: undefined,
      });
    case INGREDIENT_QUERY_FAILED:
      return merge({}, state, {
        ingredientQueryResults: [],
      });
    case INGREDIENT_QUERY_RESULT_SELECTED:
      return merge({}, state, {
        ingredientQuerySelectedResult: action.ingredient,
      });
    case INGREDIENT_QUANTITY_CHANGED:
      return merge({}, state, {
        ingredientQuantity: action.value,
      });
    case INGREDIENT_QUANTITY_TYPE_CHANGED:
      return merge({}, state, {
        ingredientQuantityType: action.value,
      });
    default:
      return state;
  }
};
