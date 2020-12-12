import { select, call, put, all, takeEvery } from "redux-saga/effects";
import axios from "axios";
import Recipe from "../../models/Recipe";
import {
  ingredientQuerySucceeded,
  INGREDIENT_QUERY_SUBMITTED,
  submitRecipeSucceeded,
  submitRecipeFailed,
  SUBMIT_RECIPE_FORM,
  ingredientQueryFailed,
} from "./actions";
import { RecipeFormError } from "./index";
import {RecipeFormState, RecipeFromFormState} from "./reducer";
import Ingredient from "../../models/Ingredient";

const createRecipeRequest = (recipe: Recipe, csrfToken: string) => axios.post(`/admin/recipe`, recipe.JSON(), {headers: {"X-CSRF-TOKEN": csrfToken}});
const searchIngredientRequest = (query: string) => axios.get(`/admin/ingredients.json?query=${encodeURI(query)}`); 

function* doSubmitRecipeForm(_action: any) {
  try {
    const csrfToken = (document.querySelector("meta[name='csrftoken']")?.attributes as any).content.nodeValue;
    const state = yield select((state: RecipeFormState) => state);
    const recipe = yield call(RecipeFromFormState, state);
    console.log(recipe);
    yield call(createRecipeRequest, recipe, csrfToken);
    yield put(submitRecipeSucceeded());
    window.location.href = `/recipe/${recipe.slug}`;
  } catch (e) {
    yield put(submitRecipeFailed(e.response.data as RecipeFormError));
  }
}

function* doSubmitIngredientQuery(_action: any) {
  try {
    const query = yield select((state: RecipeFormState) => state.ingredientQuery);
    const response = yield call(searchIngredientRequest, query);
    const ingredients = response.data.ingredients.map((i: any) => (new Ingredient(i)));
    yield put(ingredientQuerySucceeded(ingredients));
  } catch (e) {
    yield put(ingredientQueryFailed());
  }
}

function* onSubmitRecipeForm() {
  yield takeEvery((action: any) => action.type === SUBMIT_RECIPE_FORM, doSubmitRecipeForm);
}

function* onIngredientQuerySubmitted() {
  yield takeEvery((action: any) => action.type === INGREDIENT_QUERY_SUBMITTED, doSubmitIngredientQuery);
}

export default function* root() {
  yield all([
    onSubmitRecipeForm(),
    onIngredientQuerySubmitted(),
  ]);
}
