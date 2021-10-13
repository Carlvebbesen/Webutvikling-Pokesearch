import React, {FC, useState} from "react"
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {PokemonTypes} from "../types/Values";
import NativeSelect from '@mui/material/NativeSelect';
import {OutlinedInput} from "@mui/material";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ButtonBase from '@mui/material/ButtonBase';
import {useTheme, Theme} from "@mui/material/styles";

function getStyles(name: string, selected: readonly string[], theme: Theme) {
    return {
        fontWeight:
            selected.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        display: "flex"
    };
}


const Filter = () => {
    const [type, setType] = useState<string[]>([])
    const [name, setName] = useState<string>("hei")
    const theme = useTheme();

    const menuItems = PokemonTypes.map(type => <option value={type}>{type}</option>)




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


    const handleChange = (event: SelectChangeEvent<typeof type>) => {
        const {
            target: {value},
        } = event;
        setType(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <div>
            <p>hei</p>
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                    labelId="multiple-chip-label"
                    id="Type"
                    multiple
                    value={type}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {PokemonTypes.map((x) => (
                        <MenuItem sx={{display: "block"}}
                            key={x}
                            value={x}
                            style={getStyles(x, type, theme)}
                        >
                            {x}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id="outlined-search"
                label="Search field"
                type="search"
                value={name}
                onChange={event => setName(event.target.value)}
            />

        </div>
    )
}

export default Filter