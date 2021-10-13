
import React from "react"
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

interface iFilter{
    name: string
}
{/*
const Filter FC<iFilter>= (props)=>{
    return(
        <div>
            <p>hei</p>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">City</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={props.city}
                    label="City"
                    onChange={(event) => props.setCity(event.target.value)}
                >
                    <MenuItem value="All">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Oslo"}>Oslo</MenuItem>
                    <MenuItem value={"Trondheim"}>Trondheim</MenuItem>
                    <MenuItem value={"Bergen"}>Bergen</MenuItem>
                    <MenuItem value={"Tromsø"}>Tromsø</MenuItem>
                    <MenuItem value={"Stavanger"}>Stavanger</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="filled-number"
                label="Maxiumum price"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={props.price}
                onChange={(event) =>
                    props.setPrice(event.target.value as unknown as number)
                }
                variant="filled"
            />
        </div>
    )
}

export default Filter
*/}