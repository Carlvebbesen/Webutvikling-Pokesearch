import React, {FC, useEffect, useState} from "react"
import {makeStyles} from '@material-ui/core/styles';
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


const rows = PokemonData

interface iDetails extends Pokemon {
    setMethod: Function;
    getMethod: Function;
}

const Details: FC<iDetails> = (props, map) => {
    let value = 4

    return (
        <div className={style.outerWrapper}>
            <h2>{props.name}</h2>
            <div className={style.wrapper}>
                <div>
                    <img src={props.sprite_url} className={style.bigpic}/>
                </div>
                <div>
                    <p>type: {props.type}</p>
                    <p>weight: {props.weight}</p>
                </div>
                <div>
                    <div>
                        <p>average rating of {props.number_of_ratings} people</p>
                        <Rating name="read-only" defaultValue={0} precision={0.1} value={props.rating} readOnly/>
                    </div>
                    <p>Used by: {props.usage_percentage * 100}% of teams</p>
                    <div>
                        <p>your rating</p>
                        <Rating
                            name="simple-controlled"
                            value={props.getMethod(props.id)}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                props.setMethod(props.id, newValue)
                            }}
                        />
                    </div>
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
                <TableRow>
                    <TableCell padding="checkbox"/>
                    {expandComponent}
                </TableRow>
            )}
        </>
    );
};

const SimpleTable = () => {
    const [map, setMap] = useState(new Map())
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(2);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const upsert = (key: number, value: number) => {
        setMap((prev) => new Map(prev).set(key, value));
    }

    const getStars = (key: number) => {
        if (map.has(key)){
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
                            key={row.name}
                            expandComponent={<TableCell colSpan={8}>
                                {<Details
                                    getMethod={getStars}
                                    setMethod={upsert}
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
                                <img src={row.sprite_url}></img>{row.name}
                            </TableCell>
                            <TableCell align="right">{row.stats.find(e => e.name === "hp")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e => e.name === "attack")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e => e.name === "defence")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e => e.name === "sp.atk")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e => e.name === "sp.def")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e => e.name === "speed")?.value}</TableCell>
                        </ExpandableTableRow>
                    ))
                    }
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[1, 2, 10]}
                component="div"
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
        ;
}

const OverviewPage = () => {
    return (
        <div>
            <h1>
                Overview Page
            </h1>
            <SimpleTable/>
        </div>
    )
}


export default OverviewPage