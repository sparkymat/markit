import React from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { RecipeFormState } from "./reducer";
import { 
  cuisineChanged,
  descriptionChanged,
  instructionSetsAddNew,
  instructionSetsTitleChanged,
  instructionSetsInstructionChanged,
  instructionSetsInstructionAddNew,
  instructionSetsInstructionDeleted,
  slugChanged,
  submitRecipeForm,
  titleChanged,
  ingredientModalClosed,
  ingredientGroupTitleChanged,
  ingredientGroupIngredientQuantityDeleted,
  ingredientGroupIngredientQuantityAddNew,
  ingredientGroupsAddNew,
  ingredientQueryChanged,
  ingredientQuerySubmitted,
  ingredientQueryResultSelected,
  ingredientQuantityChanged,
  addIngredientModalSubmitted,
  ingredientQuantityTypeChanged
} from "./actions";
import InputField from "../InputField";
import Button from "../Button";
import InstructionSet from "../../models/InstructionSet";
import IngredientGroup from "../../models/IngredientGroup";
import IngredientQuantity from "../../models/IngredientQuantity";
import Ingredient from "../../models/Ingredient";
import { QuantityTypes } from "../../models/Quantity";

export interface RecipeFormError {
  error: string;
  params: {
    cuisine: string | undefined;
    description: string | undefined;
    slug: string | undefined;
    title: string | undefined;
  };
}

const RecipeForm = () => {
  const cuisine = useSelector((state: RecipeFormState) => state.cuisine);
  const description = useSelector((state: RecipeFormState) => state.description);
  const slug = useSelector((state: RecipeFormState) => state.slug);
  const title = useSelector((state: RecipeFormState) => state.title);

  const ingredientQuery = useSelector((state: RecipeFormState) => state.ingredientQuery);
  const ingredientQueryResults = useSelector((state: RecipeFormState) => state.ingredientQueryResults);
  const ingredientQuerySelectedResult = useSelector((state: RecipeFormState) => state.ingredientQuerySelectedResult);
  const ingredientQuantity = useSelector((state: RecipeFormState) => state.ingredientQuantity);
  const ingredientQuantityType = useSelector((state: RecipeFormState) => state.ingredientQuantityType);

  const instructionSets = useSelector((state: RecipeFormState) => state.instructionSets);
  const ingredientGroups = useSelector((state: RecipeFormState) => state.ingredientGroups);

  const ingredientModalOpen = useSelector((state: RecipeFormState) => state.ingredientModalOpen);

  const formError = useSelector((state: RecipeFormState) => state.formError);

  const dispatch = useDispatch()

  return (
    <div className="container font-light mx-auto flex flex-col justify-items-center mb-16">
      <h1 className="logo self-center my-4">Divine Cooking</h1>
      <h3 className="text-4xl self-center my-4">New recipe</h3>
      <form action="/admin/recipe" method="POST">
        <div className="text-2xl flex flex-row">
          <InputField
            id           = { "title"                                                                     }
            label        = { "Title"                                                                     }
            name         = { "title"                                                                     }
            value        = { title                                                                       }
            hasError     = { formError?.params?.title !== undefined && formError?.params?.title !== null }
            errorMessage = { formError?.params?.title                                                    }
            onChange     = { (value: string) => dispatch(titleChanged(value))                            }
            />
        </div>
        <div className="text-2xl flex flex-row mt-4">
          <InputField
            id           = { "cuisine"                                                                       }
            label        = { "Cuisine"                                                                       }
            name         = { "cuisine"                                                                       }
            value        = { cuisine                                                                         }
            hasError     = { formError?.params?.cuisine !== undefined && formError?.params?.cuisine !== null }
            errorMessage = { formError?.params?.cuisine                                                      }
            onChange     = { (value: string) => dispatch(cuisineChanged(value))                              }
            />
          <InputField
            id           = { "slug"                                                                    }
            label        = { "Slug"                                                                    }
            name         = { "slug"                                                                    }
            value        = { slug                                                                      }
            hasError     = { formError?.params?.slug !== undefined && formError?.params?.slug !== null }
            errorMessage = { formError?.params?.slug                                                   }
            onChange     = { (value: string) => dispatch(slugChanged(value))                           }
            />
        </div>
        <div className="flex flex-row mt-4">
          <a href="#" className="flex-grow">
            <div className="m-4 h-24 border border-dashed border-gray-500 rounded flex flex-col justify-center">
              <span className="text-xl self-center">Select full-sized</span>
            </div>
          </a>
          <a href="#" className="flex-grow">
            <div className="m-4 h-24 border border-dashed border-gray-500 rounded flex flex-col justify-center">
              <span className="text-xl self-center">Select banner</span>
            </div>
          </a>
          <a href="#" className="flex-grow">
            <div className="m-4 h-24 border border-dashed border-gray-500 rounded flex flex-col justify-center">
              <span className="text-xl self-center">Select thumbnail</span>
            </div>
          </a>
        </div>
        <div className="flex flex-col mt-4 text-2xl">
          <InputField
            id           = { "description"                                          }
            value        = { description                                            }
            onChange     = { (value: string) => dispatch(descriptionChanged(value)) }
            />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="text-3xl mb-2">Ingredients</h3>
          {
            ingredientGroups.map((ingredientGroup: IngredientGroup, i: number) => (
              <div className="flex flex-col border border-dashed border-black rounded-lg p-4 mt-2" key={`ingredient-group-${i}`}>
                <div className="flex flex-col">
                  <InputField
                    label        = { "Group title"                                                      }
                    value        = { ingredientGroup.title                                              }
                    onChange     = { (value: string) => dispatch(ingredientGroupTitleChanged(i, value)) }
                    />
                  {
                    ingredientGroup.ingredientQuantities.map((ingredientQuantity: IngredientQuantity, stepIndex: number) => (
                      <div className="row flex flex-row mt-2">
                        <div>{ ingredientQuantity.render() }</div>
                        <Button
                          color     = { "red"                                                                  }
                          className = { "ml-2"                                                                 }
                          onClick   = { () => dispatch(ingredientGroupIngredientQuantityDeleted(i, stepIndex)) }
                          >
                          Delete
                        </Button>
                      </div>
                    ))
                  }
                  <Button
                    color     = { "purple"                                                   }
                    className = { "mt-2"                                                     }
                    onClick   = { () => dispatch(ingredientGroupIngredientQuantityAddNew(i)) }
                    >
                    Add ingredient
                  </Button>
                  <ReactModal
                    isOpen         = { ingredientModalOpen                     }
                    contentLabel   = { "Add new"                               }
                    onRequestClose = { () => dispatch(ingredientModalClosed()) }
                    style          = {{
                        overlay: {
                          backgroundColor: "rgba(1, 1, 1, 0.6)"
                        },
                        content: {
                          display:       "flex",
                          flexDirection: "column",
                          alignItems:    "stretch",
                        }
                      }}
                    >
                    <h5 className="text-xl text-center">New ingredient</h5>
                    <div className="flex flex-row">
                      <InputField
                        label    = { ""                                                         }
                        value    = { ingredientQuery                                            }
                        onChange = { (value: string) => dispatch(ingredientQueryChanged(value)) }
                        />
                      <Button
                        color     = { "purple"                                   }
                        className = { "ml-2"                                     }
                        onClick   = { () => dispatch(ingredientQuerySubmitted()) }
                        >
                        Search
                      </Button>
                    </div>
                    <div className="flex flex-row flex-wrap">
                      { ingredientQueryResults.slice(0, 12).map((result: Ingredient) => (
                        <div className="w-1/4 px-2 mt-2">
                          <Button
                            color     = { ingredientQuerySelectedResult && ingredientQuerySelectedResult.title === result.title ? "green" : "gray" }
                            className = { "w-full"                                                                                                              }
                            onClick   = { () => dispatch(ingredientQueryResultSelected(result))                                                                 }
                            >
                            { result.title }
                          </Button>
                        </div>
                      )) }
                    </div>
                    <div className="flex flex-row mt-2">
                      <select
                        onChange = { (e: React.FormEvent<HTMLSelectElement>) => dispatch(ingredientQuantityTypeChanged(e.currentTarget.value)) }
                        value    = { ingredientQuantityType                                                                                                         }
                        >
                        <option></option>
                        { QuantityTypes.map((quantityType: string) => (
                          <option>{ quantityType }</option>
                        )) }
                      </select>
                      <InputField
                        value    = { ingredientQuantity                                            }
                        onChange = { (value: string) => dispatch(ingredientQuantityChanged(value)) }
                        />
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex flex-row justify-between">
                      <Button
                        color     = { "gray"                                  }
                        className = { "mt-4"                                  }
                        onClick   = { () => dispatch(ingredientModalClosed()) }
                        >
                        Close
                      </Button>
                      <Button
                        color     = { "blue"                                        }
                        className = { "mt-4"                                        }
                        onClick   = { () => dispatch(addIngredientModalSubmitted()) }
                        >
                        Add
                      </Button>
                    </div>
                  </ReactModal>
                </div>
              </div>
            ))
          }
          <div className="flex flex-col">
            <Button
              color     = { "purple"                                 }
              className = { "mt-2"                                   }
              onClick   = { () => dispatch(ingredientGroupsAddNew()) }
              >
              Add new group
            </Button>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="text-3xl mb-2">Instructions</h3>
          {
            instructionSets.map((instructionSet: InstructionSet, i: number) => (
              <div className="flex flex-col border border-dashed border-black rounded-lg p-4 mt-2" key={`instruction-set-${i}`}>
                <div className="flex flex-col">
                  <InputField
                    label        = { "Section title"                                                    }
                    value        = { instructionSet.title                                           }
                    onChange     = { (value: string) => dispatch(instructionSetsTitleChanged(i, value)) }
                    />
                  {
                    instructionSet.instructions.map((instruction: string, stepIndex: number) => (
                      <div className="row flex flex-row mt-2">
                        <InputField
                          key          = { `instruction_sets_${i}_instructions_${stepIndex}`                                   }
                          label        = { `${stepIndex+1}`                                                                    }
                          value        = { instruction                                                                         }
                          multiline    = { true                                                                                }
                          onChange     = { (value: string) => dispatch(instructionSetsInstructionChanged(i, stepIndex, value)) }
                          />
                        <Button
                          color     = { "red"                                                           }
                          className = { "ml-2"                                                          }
                          onClick   = { () => dispatch(instructionSetsInstructionDeleted(i, stepIndex)) }
                          >
                          Delete
                        </Button>
                      </div>
                    ))
                  }
                  <Button
                    color     = { "green"                                             }
                    className = { "mt-2"                                              }
                    onClick   = { () => dispatch(instructionSetsInstructionAddNew(i)) }
                    >
                    Add instruction
                  </Button>
                </div>
              </div>
            ))
          }
          <div className="flex flex-col">
            <Button
              color     = { "green"                                 }
              className = { "mt-2"                                  }
              onClick   = { () => dispatch(instructionSetsAddNew()) }
              >
              Add new section
            </Button>
          </div>
        </div>
        {
          formError != null && (
            <p className="mt-4 p-4 border rounded border-red-700 font-bold text-red-700 text-xl">Save failed. Error: {formError.error}</p>
          )
        }
        <div className="flex flex-col mt-8">
          <Button
            color   = { "blue"                             }
            onClick = { () => dispatch(submitRecipeForm()) }
            >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
