import React from "react";
import { useQuery } from "@apollo/client";
import { Details } from "../simpleTable/SimpleTable";

interface popUpProps {
    pokemonId: number;
    show: ()=> void;
}

const PopUp: React.FC<popUpProps> = ({ pokemonId, show }) => {
    return (
        <div>
            <Details pokemonId={pokemonId}/>
        </div>
    );
};

export default PopUp;