class Ingredient{
  id:    string;
  title: string;

  public constructor(values: {[index: string]: any;}) {
    this.id    = values.id;
    this.title = values.title;
  }

  JSON(): {[index: string]: any;} {
    return {
      id:    this.id,
      title: this.title,
    };
  }
}

export default Ingredient;
