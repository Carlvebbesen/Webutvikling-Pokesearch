import {Pokemon} from "../../types/Pokemon";
import React, {FC, useState} from "react";
import style from "./SimpleTable.module.css";
import Rating from "@mui/material/Rating";
import Team from "../team/Team";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {capitalize} from "@mui/material";


interface iDetails extends Pokemon {
    setRating: Function;
    getRating: Function;
}

const Details: FC<iDetails> = (props) => {
    const teamMembers = [1, 2, 3, 4]
    return (
        <div className={style.outerWrapper}>
            <h1>{capitalize(props.name)}</h1>
            <div className={style.wrapper}>
                <div className={style.detailsDiv}>
                    <img src={props.sprite_url} className={style.bigpic} alt="pokemon"/>
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

interface iSimpleTable {
    rows: Pokemon[]
    map: Map<number, number>
    page: number
    rowsPerPage: number
    setMap: Function
    setPage: Function
    setRowsPerPage: Function
}

const SimpleTable: FC<iSimpleTable> = (props) => {
    const handleChangePage = (event: unknown, newPage: number) => {
        props.setPage(newPage);
    };

    const upsert = (key: number, value: number) => {
        props.setMap((prev: Map<number, number>) => new Map(prev).set(key, value));
    }

    const getStars = (key: number) => {
        if (props.map.has(key)) {
            return props.map.get(key)
        } else {
            return 0
        }
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setRowsPerPage(+event.target.value);
        props.setPage(0);
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
                        {props.rows.slice(
                            props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                            .map(row => (
                                <ExpandableTableRow
                                    key={capitalize(row.name)}
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
                                        <img src={row.sprite_url} alt="pokemon"></img>{capitalize(row.name)}
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
                    count={props.rows.length}
                    page={props.page}
                    rowsPerPage={props.rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
        ;
}

export default SimpleTable