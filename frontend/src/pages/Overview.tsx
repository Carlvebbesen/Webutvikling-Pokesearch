import React from "react"
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        minWidth: 650
    }
});

function createData(name:string, calories:number, fat:number, carbs:number, protein:number, detail:string) {
    return { name, calories, fat, carbs, protein, detail };
}

const rows = PokemonData

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }:any) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <>
            <TableRow {...otherProps}>
                <TableCell padding="checkbox">
                    <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {children}
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <TableCell padding="checkbox" />
                    {expandComponent}
                </TableRow>
            )}
        </>
    );
};

const SimpleTable=()=> {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" />
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
                    {rows.map(row => (
                        <ExpandableTableRow
                            key={row.name}
                            expandComponent={<TableCell colSpan={8}>{row.weight}</TableCell>}
                        >
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">{row.stats.find(e=>e.name=="hp")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e=>e.name=="attack")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e=>e.name=="defence")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e=>e.name=="sp.atk")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e=>e.name=="sp.def")?.value}</TableCell>
                            <TableCell align="right">{row.stats.find(e=>e.name=="speed")?.value}</TableCell>

                        </ExpandableTableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}


const OverviewPage = ()=>{
    return(
        <div>
            <h1>
                Overview Page
            </h1>
        </div>
    )
}



export default SimpleTable