import React, { useState } from 'react';
import Countries from './components/Countries';
import {FormControl, IconButton, InputBase, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaRegMoon } from 'react-icons/fa';

function App() {

    const [search, setSearch] = useState<string>();
    const [getSearchCountry, setSearchCountry] = useState({
        population: 0,
        name: '',
        region: '',
        capital: '',
        flag: '',
    });
    const [timer, setTimer] = useState<any>(null);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        clearTimeout(timer);
        const newTimer = setTimeout(() =>
            fetchbyName(), 500);
        setTimer(newTimer);
    }

    const fetchbyName = async () => {
        const response = await fetch(`https://restcountries.com/v2/name/${search}?fields=capital,population,region,flag,name`);
        const json = await response.json();
        setSearchCountry({
            population: json[0].population,
            name: json[0].name,
            region: json[0].region,
            capital: json[0].capital,
            flag: json[0].flag,
        });
    }

return (
        <div className="h-screen w-full">
            <div className="flex items-center w-full h-24 border-b-2 border-gray-300">
                <div className="w-4/5 sm:ml-16 ml-4 sm:text-4xl text-xl font-bold">
                    <h1>
                        Where in the world?
                    </h1>
                </div>
                <div className="w-1/5 sm:ml-auto ml-20 text-lg sm:mr-0 mr-20">
                    <div className="inline-block sm:mr-2">
                        <FaRegMoon/>
                    </div>
                    <button name="theme-switch">
                        Dark
                    </button>
                </div>
            </div>
            <div className="flex sm:flex-nowrap flex-wrap w-full h-16 mt-16">
                <div className="w-4/5 sm:ml-36 ml-4">
                    <InputBase
                        name="searchCountry"
                        placeholder="Search for a country..."
                        className="shadow-md p-2 w-60"
                        onChange={handleChange}
                    />
                    <IconButton sx={{ p: '10px' }} type='button' aria-label="search">
                        <HiOutlineSearch/>
                    </IconButton>
                </div>
                <div className="w-1/5 sm:mt-0 mt-6 sm:ml-0 ml-6">
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="region">
                            Filter by Region
                        </InputLabel>
                        <Select
                            id="region"
                            label="Filter"
                        >
                            <MenuItem value="Africa">Africa</MenuItem>
                            <MenuItem value="America">America</MenuItem>
                            <MenuItem value="Asia">Asia</MenuItem>
                            <MenuItem value="Europe">Europe</MenuItem>
                            <MenuItem value="Oceania">Oceania</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="sm:ml-16 ml-4 sm:mt-10 mt-24">
                <Countries {...getSearchCountry} />
            </div>
        </div>
);
}

export default App;
