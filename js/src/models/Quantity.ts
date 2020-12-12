export const QuantityTypes = [
	"TableSpoon",
	"TeaSpoon",
	"Cup",
	"Litre",
	"Millilitre",
	"Kilogram",
	"Gram",
	"Count",
];

class Quantity {
  value:        number;
  quantityType: string;

  public constructor(values: {[index: string]: any;}) {
    this.value = parseFloat(values.value);
    this.quantityType = values.quantityType;
  }

  JSON(): {[index: string]: any;} {
    return {
      value:        this.value,
      quantityType: this.quantityType,
    };
  }
  
  render(): string {
    switch(this.quantityType) {
      case "Count":
        return `${this.value}`;
      default:
        return `${this.value} ${this.quantityType}`;
    }
  }
}

export default Quantity;
