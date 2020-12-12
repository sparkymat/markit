class InstructionSet {
  title:        string;
  instructions: string[];

  public constructor(values: {[index: string]: any;}) {
    this.title        = values.title;
    this.instructions = values.instructions;
  }

  JSON(): {[index: string]: any;}  {
    return {
      title:        this.title,
      instructions: this.instructions,
    };
  }
}

export default InstructionSet;
