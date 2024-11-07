

export default class Converter
{
    constructor(idbManager)
    {
        //the idb database to retrieve and save data to and from CACHE database
        this._idbManager = idbManager;
    }

    getAllCurrencies(callBack)
    {
        fetch("https://api.exchangeratesapi.io/v1/latest?access_key=3d1ebf44fb89684d580639c914bf2c43&format=1")
        .then(response => callBack(null, response))
        .catch(error => callBack(error, null));
    }

    //Converts the currency
    convertCurrency(amount, fromCurrency, toCurrency, callBack)
    {
        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        const query = fromCurrency + ',' + toCurrency;

        //we build the URL
         const url = `https://api.exchangeratesapi.io/v1/latest?access_key=3d1ebf44fb89684d580639c914bf2c43&format=1&symbols=${query}`;
       
         fetch(url)
            .catch(error => callBack(error))
            .then(results => 
                {
                    //Invoke's the call back method of the upper layer using this class after 
                    //converting the result to json.
                    results.json().then(jsonData => 
                        {
                           
                         
                           let fromValue = jsonData["rates"].JPY;
                           let toValue = jsonData["rates"].IDR;
                           let total = toValue / fromValue * amount * 1.1;                     
                           callBack(null, (Math.ceil(total / 1000) * 1000));

                        });
                });            
    }
}

