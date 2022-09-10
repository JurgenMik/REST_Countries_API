import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function DetailView({ countryId, handleBack} : any) {

    interface detailInterface{
        population: number,
        name: string,
        region: string,
        capital: string,
        subregion: string,
        languages: Array<language>,
        flag: string,
        nativeName: string,
    };

    interface language{
        iso639_1 : string;
        iso639_2 : string;
        name: string;
        nativeName: string;
    }

    const [getDetail , setDetail] = React.useState<detailInterface>({
        population: 0,
        name: '',
        region: '',
        capital: '',
        subregion: '',
        languages: [],
        flag: '',
        nativeName: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://restcountries.com/v2/name/${countryId}?fields=capital,population,region,flag,name,languages,subregion,nativeName`);
            const json  = await response.json();
            setDetail({
                population: json[0].population,
                name: json[0].name,
                region:json[0].region,
                capital:json[0].capital,
                subregion: json[0].subregion,
                languages: json[0].languages,
                flag: json[0].flag,
                nativeName: json[0].nativeName,
            })
        }
        fetchData()
            .catch(console.error);
    }, []);

    return(
        <div className="w-full h-screen">
            <div className="sm:ml-32 ml-6">
                <button onClick={handleBack} className="pr-8 pl-8 p-1 text-md rounded-md border border-gray-300" name="returnView">
                    <FaArrowLeft className="inline mr-2"/>
                    Back
                </button>
            </div>
            <div className="w-3/4 h-1/2 sm:mr-auto sm:ml-auto ml-8 sm:mt-20 mt-10">
                <div className="grid sm:grid-cols-2 grid-cols-1">
                    <div className="w-full h-full">
                        <img className="sm:w-3/4 w-80" src={getDetail.flag} alt="country"/>
                    </div>
                    <div className="w-full h-full mt-10">
                        <h1 className="sm:text-4xl text-xl font-bold">
                            {getDetail.name}
                        </h1>
                        <div className="w-full grid grid-cols-2 mt-10 sm:text-xl text-md">
                            <div className="space-y-2">
                                <h1><span className="font-semibold">Native Name: </span>{getDetail.nativeName}</h1>
                                <h1><span className="font-semibold">Population: </span>{getDetail.population}</h1>
                                <h1><span className="font-semibold">Region: </span>{getDetail.region}</h1>
                                <h1><span className="font-semibold">Sub Region: </span>{getDetail.subregion}</h1>
                                <h1><span className="font-semibold">Capital: </span>{getDetail.capital}</h1>
                            </div>
                            <div className="space-y-2">
                                <h1><span className="inline font-semibold">Languages: </span>
                                {getDetail.languages.map(({name} : any, index) => {
                                    return(
                                        <div key={index}>
                                            {name}
                                        </div>
                                    )
                                })}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailView;