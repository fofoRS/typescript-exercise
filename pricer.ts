
export type Category = 'size' | 'creamer';
export type Option = 'small' | 'medium' | 'large' | 'none' | 'dairy' |
'non-dairy';
export type Price = number;
export interface Pricer {
/**
* Invoked each time the user makes a selection.
* No need to validate arguments, the caller validates the
arguments before this function is invoked.
* @returns the _total_ price of the coffee so far given all the
selections made
*/
(category: Category, option: Option): Price
}
/**
* A new pricer is created for each coffee being purchased.
*/
export const createPricer = (): Pricer => {


    interface PricerState {
        selectedSizeOptionPrice : OptionPrice | null;
        selectedCreamerOption : OptionPrice | null;
    }

    interface OptionPrice {
        readonly option:Option;
        readonly price: Price;
    }

    // size option prices
    const smallOptionPrice : OptionPrice =  {option: 'small', price: 1.00};
    const mediumOptionPrice : OptionPrice =  {option: 'medium', price: 1.50};
    const largeOptionPrice : OptionPrice =  {option: 'large', price: 2.00};

    // creamer option prices
    const noneOptionPrice : OptionPrice =  {option: 'none', price: 0.00};
    const dairyOptionPrice : OptionPrice =  {option: 'dairy', price: 0.25};
    const nonDairyOptionPrice : OptionPrice =  {option: 'non-dairy', price: 0.50};


    let state : PricerState = {
        selectedSizeOptionPrice : null,
        selectedCreamerOption : null,
    }


    const pricesCatalog: Map<Category,ReadonlyArray<OptionPrice>> = new Map([
        ['size',[
            smallOptionPrice,
            mediumOptionPrice,
            largeOptionPrice,
        ]],
        ['creamer',[ 
            noneOptionPrice,
            dairyOptionPrice,
            nonDairyOptionPrice,
        ]]
    ]);

    return (category: Category, option: Option): Price  => {

        // trusting in argument values.
        // No fallback to default values as this might creates silent  side effects and fallback default values are not described in the exercise.

        const categoryOptions : ReadonlyArray<OptionPrice> = pricesCatalog.get(category)!; 
        const optionPrice : OptionPrice = categoryOptions.find((optionPriceItem) => optionPriceItem.option === option)!;

        if (category === 'size') {
            state = {...state, selectedSizeOptionPrice: optionPrice};
        } else if (category === 'creamer') {
            state = {...state, selectedCreamerOption: optionPrice};
        }

        const selectedSizePrice = state?.selectedSizeOptionPrice?.price ?? 0.00;
        const selectedCreamerPrice = state?.selectedCreamerOption?.price ?? 0.00;
    
        return selectedSizePrice + selectedCreamerPrice;
        
    }
}