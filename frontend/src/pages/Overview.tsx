import React, {useEffect, useState} from "react"
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


const rows = PokemonData

const Details = (name: string, img_url: string, type: string[], weight: number, averageRating: number,
                 ratings: number, percentage: number) => {
    const [value, setValue] = useState<number>(0)
    return (
        <div className={style.outerWrapper}>
            <h2>{name}</h2>
            <div className={style.wrapper}>
                <div>
                    <img src={img_url} className={style.bigpic}/>
                </div>
                <div>
                    <p>type: {type}</p>
                    <p>weight: {weight}</p>
                </div>
                <div>
                    <div>
                        <p>average rating of {ratings} people</p>
                        <Rating name="read-only" defaultValue={0} precision={0.1} value={averageRating} readOnly/>
                    </div>
                    <p>Used by: {percentage * 100}% of teams</p>
                    <div>
                        <p>your rating</p>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setValue(newValue ? newValue : 0)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExpandableTableRow = ({children, expandComponent, ...otherProps}: any) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

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
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(2);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        console.log("page " + {page} as string)
        console.log("rowsPerPage " + {rowsPerPage} as string)
    }, [page, rowsPerPage])

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
                                {Details(row.name, row.sprite_url, row.type, row.weight, row.rating, 10, row.usage_percentage)}
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