
import style from './statTable.module.css';

interface IStatEntry {
    name: String,
    value: Number   
}

interface IStatProps {
    stats: IStatEntry[]
}

const colorByValue = (value: Number) => {
    return value > 100 ? '#006400'
        : value > 80 ? '#90ee90'
        : value > 50 ? '#ffbf00'
        : '#ff4d4d';
}

export const StatTable = (props: IStatProps) => {

    return (
        <div className={style.container}>
            <h3>Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                {props.stats.map((stat) =>
                    <div className={style.statEntry}>
                        <span style={{ width: '35%', fontSize: '12px', textAlign: 'start'}}>{stat.name}</span>
                        <span style={{ width: '10%'}}>{stat.value}</span>
                        <div style={{ marginLeft: '10px', width: `calc(60px / 100 * ${stat.value})`, height: '10px', background: colorByValue(stat.value), borderRadius: '2%'}}></div>
                    </div>
                )}
            </div>
        </div>
    );

};