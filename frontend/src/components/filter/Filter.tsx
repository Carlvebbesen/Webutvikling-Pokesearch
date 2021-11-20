import React, {FC} from "react"
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {PokemonTypes} from "../../utils/Values";
import {OutlinedInput, Rating} from "@mui/material";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useTheme, Theme} from "@mui/material/styles";
import style from "./Filter.module.css"
import { getPokeTypeIcon } from "../../static/typeIcons/pokeTypeIcons";

function getStyles(name: string, selected: readonly string[], theme: Theme) {
    return {
        fontWeight:
            selected.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        display: "flex"
    };
}

interface iFilter {
    type: string[]
    name: string
    rating: number
    setType: Function
    setName: Function
    setRating: Function
}


const Filter: FC<iFilter> = (props) => {

    const theme = useTheme();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    const handleChange = (event: SelectChangeEvent<typeof props.type>) => {
        const value = event.target.value;
        if (value.length <= 2) {
            props.setType(
                // On autofill we get a the stringified value.
                typeof value === 'string' ? value.split(',') : value
            );
        } else {
            props.setType(
                typeof value === 'string' ? value.split(',') : value.splice(1,value.length)
            )
        }
    };


    return (
        <div className={style.filter}>
            <TextField sx={{m: 1, width: 200}}
                       id="outlined-search"
                       label="Name"
                       type="search"
                       value={props.name}
                       onChange={event =>
                           props.setName(event.target.value)}
                       data-cy="name_input"
            />
            <FormControl sx={{m: 1, width: 200}} data-cy="type-selector-container">
                <InputLabel id="demo-multiple-chip-label">Type (Max 2)</InputLabel>
                <Select
                    data-cy="type-selector"
                    labelId="multiple-chip-label"
                    id="Type"
                    multiple
                    value={props.type}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Type"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {PokemonTypes.map((type) => (
                        <MenuItem sx={{display: "block"}}
                                  key={type}
                                  value={type}
                                  style={getStyles(type, props.type, theme)}
                                  data-cy={`type-option-${type}`}
                        >
                            <><img title={type} style={{marginRight: "10px"}} height="20" alt="pokemonTypes" src={getPokeTypeIcon(type)}/>{type} </>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div>
                <p>Minimum rating:</p>
                <div onClick={()=> props.setRating(0)}>
                <Rating
                    name="simple-controlled"
                    value={props.rating}
                    precision={0.5}
                    onChange={(event, star) => {
                        if (star != null) {
                            props.setRating(star);
                        }
                        else {
                            props.setRating(0);
                        }
                    }}
                    />
                    </div>
            </div>

        </div>
    )
}

export default Filter