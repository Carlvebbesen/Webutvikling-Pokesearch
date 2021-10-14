import React, {FC, useEffect, useState} from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {PokemonData} from "../../src/data/pokemonData"
import Rating from '@mui/material/Rating';
import style from "./Overview.module.css"
import TablePagination from '@mui/material/TablePagination';
import {Pokemon} from "../types/Pokemon";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Filter from "../components/Filter"
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Pagination} from "@mui/material";


const rows = PokemonData
const styles = {
    MuiTablePaginationMenuItem: {
        display: "flex"
    }
}

function getStyles() {
    return {
        display: "flex"
    };
}

function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

interface iTeamMember {
    teamId: number
    pokemonid: number
}

const TeamMember: FC<iTeamMember> = (props) => {
    function handleSwap() {
        alert("remove " + props.teamId + " and add " + props.pokemonid)
    }

    function handleAdd() {
        alert("add " + props.pokemonid)
    }


    if (props.teamId !== 0) {
        return (
            <div className={style.teamMember}>
                <p>{props.teamId}</p>
                <SwapHorizontalCircleOutlinedIcon className={style.removeButton} onClick={handleSwap}/>
            </div>
        )
    }
    return (
        <div className={style.emptyTeamMember}>
            <AddCircleOutlineIcon className={style.addButton} onClick={handleAdd}/>
        </div>
    )
}

interface iTeam {
    members: number[]
    pokemonid: number
}

const Team: FC<iTeam> = (props) => {
    const team = props.members.map(id => <li><TeamMember teamId={id} pokemonid={props.pokemonid}/></li>)
    while (team.length < 6) {
        team.push(<li><TeamMember teamId={0} pokemonid={props.pokemonid}/></li>)
    }
    return (
        <div className={style.team}>
            <h4>Current Team</h4>
            <ul className={style.teamList}>
                {team}
            </ul>
        </div>
    )
}


interface iDetails extends Pokemon {
    setRating: Function;
    getRating: Function;
}

const Details: FC<iDetails> = (props) => {
    const teamMembers = [1, 2, 3, 4]
    return (
        <div className={style.outerWrapper}>
            <h1>{capitalizeFirstLetter(props.name)}</h1>
            <div className={style.wrapper}>
                <div className={style.detailsDiv}>
                    <img src={props.sprite_url} className={style.bigpic}/>
                </div>
                <div className={style.detailsDiv}>
                    <p>type: {props.type}</p>
                    <p>number: {props.id}</p>
                    <p>weight: {props.weight}</p>
                </div>
                <div className={style.detailsDiv}>
                    <div>
                        <p>average rating of {props.number_of_ratings} people</p>
                        <Rating name="read-only" defaultValue={0} precision={0.1} value={props.rating} readOnly/>
                    </div>
                    <p>Used by: {props.usage_percentage * 100}% of teams</p>
                    <div>
                        <p>your rating</p>
                        <Rating
                            name="simple-controlled"
                            value={props.getRating(props.id)}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                props.setRating(props.id, newValue)
                            }}
                        />
                    </div>
                </div>
                <div className={style.detailsDiv}>
                    <Team members={teamMembers} pokemonid={props.id}/>
                </div>
            </div>
        </div>
    )
}

const ExpandableTableRow = ({children, expandComponent, ...otherProps}: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <TableRow {...otherProps}>
                <TableCell padding="checkbox">
                    <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                {children}
            </TableRow>
            {isExpanded && (
                <TableRow className={style.expanding}>
                    <TableCell padding="checkbox"/>
                    {expandComponent}
                </TableRow>
            )}
        </>
    );
};

const SimpleTable = () => {
    const [map, setMap] = useState(new Map())
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const upsert = (key: number, value: number) => {
        setMap((prev) => new Map(prev).set(key, value));
    }

    const getStars = (key: number) => {
        if (map.has(key)) {
            return map.get(key)
        } else {
            return 0
        }
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Paper className={style.root}>
                <Table stickyHeader className={style.table} aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"/>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">HP</TableCell>
                            <TableCell align="right">Attack</TableCell>
                            <TableCell align="right">Defence</TableCell>
                            <TableCell align="right">Sp. Atk</TableCell>
                            <TableCell align="right">Sp. Def</TableCell>
                            <TableCell align="right">Speed</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                            <ExpandableTableRow
                                key={capitalizeFirstLetter(row.name)}
                                expandComponent={<TableCell colSpan={8}>
                                    {<Details
                                        getRating={getStars}
                                        setRating={upsert}
                                        id={row.id}
                                        name={row.name}
                                        type={row.type}
                                        stats={row.stats}
                                        weight={row.weight}
                                        rating={row.rating}
                                        number_of_ratings={10}
                                        usage_percentage={row.usage_percentage}
                                        sprite_url={row.sprite_url}
                                    />
                                    }
                                </TableCell>}
                            >
                                <TableCell component="th" scope="row">
                                    <img src={row.sprite_url}></img>{capitalizeFirstLetter(row.name)}
                                </TableCell>
                                <TableCell align="right">{row.stats.find(e => e.name === "hp")?.value}</TableCell>
                                <TableCell
                                    align="right">{row.stats.find(e => e.name === "attack")?.value}</TableCell>
                                <TableCell
                                    align="right">{row.stats.find(e => e.name === "defence")?.value}</TableCell>
                                <TableCell
                                    align="right">{row.stats.find(e => e.name === "sp.atk")?.value}</TableCell>
                                <TableCell
                                    align="right">{row.stats.find(e => e.name === "sp.def")?.value}</TableCell>
                                <TableCell
                                    align="right">{row.stats.find(e => e.name === "speed")?.value}</TableCell>
                                <TableCell
                                    align="right">{row.stats.map(e => e.value as number).reduce((a, b) => a + b, 0)}</TableCell>
                            </ExpandableTableRow>
                        ))
                        }
                    </TableBody>
                </Table>
                <TablePagination //TODO: https://mui.com/api/table-pagination/
                    rowsPerPageOptions={[5, 10, 15]}
                    count={rows.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
        ;
}

const OverviewPage = () => {
    const [type, setType] = useState<string[]>([])
    const [name, setName] = useState<string>("")
    const [stars, setStars] = useState<number>(0)
    return (
        <div className={style.overview}>
            <h1>
                Overview Page
            </h1>
            <Filter name={name} setName={setName} setStars={setStars} stars={stars} setType={setType} type={type}/>
            <SimpleTable/>
        </div>
    )
}


export default OverviewPage