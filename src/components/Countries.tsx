import React, { useEffect } from 'react';

function Countries() {

    interface countryInterface{
        population: number,
        name: string,
        region: string,
        capital: string,
        flag: string,
    };

    const [countries, setCountries] = React.useState<countryInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://restcountries.com/v2/all?fields=capital,population,region,flag,name');
            const json  = await response.json();
            setCountries(countries.concat(json.slice(242)));
        }
        fetchData()
            .catch(console.error);
    }, []);

return (
    <div className="w-full h-80 grid sm:grid-cols-4 grid-cols-1 justify-items-center gap-4">
        {countries.map(({capital, region, flag, population, name}, key) => {
        return(
            <div className="sm:w-3/4 w-full h-full mb-4" key={key}>
                <img className="sm:w-3/4 w-80 h-60 sm:ml-0 ml-2" src={flag} alt="country"/>
                <div className="mt-8 ml-10">
                    <h1 className="text-2xl font-bold">
                        {name}
                    </h1>
                    <div className="sm:text-md text-xl mt-4">
                        <h1><span className="font-semibold">Population: </span>{population}</h1>
                        <h1><span className="font-semibold">Region: </span>{region}</h1>
                        <h1><span className="font-semibold">Capital: </span>{capital}</h1>
                    </div>
                </div>
            </div>
        )
        })}
    </div>
);
}

export default Countries;