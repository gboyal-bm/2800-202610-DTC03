import { useEffect, useState } from "react";
import { WeatherUtils } from "../utils/weather";

const vancouverLocation = {
    lat: 49.246292,
    lon: -123.116226,
}

export function WeatherTest() {
    const [temp, setTemp] = useState("Loading");
    
    useEffect(() => {
        WeatherUtils.getCurrentTempInCelsius(vancouverLocation.lat, vancouverLocation.lon)
        .then(setTemp);
    }, []);

    return (
        <main className="h-[80vh] max-w-5xl mx-auto mt-12">
            <div className="flex justify-center items-center p-8">
                <h1 className="font-bold text-4xl uppercase">Weather Test</h1>
            </div>
            <div className="text-xl flex flex-col items-center justify-center border rounded-lg p-8">
                <h3>{temp}</h3>
            </div>
        </main>
    );
}