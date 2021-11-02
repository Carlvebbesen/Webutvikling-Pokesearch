
import style from './statTable.module.css';

interface IStatEntry {
    name: string,
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
                    <div key={stat.name} className={style.statEntry}>
                        <span className={style.statName}>{stat.name}</span>
                        <span className={style.statValue}>{stat.value}</span>
                        <div className={style.statBar}
                            style={{ width: `calc(60px / 100 * ${stat.value})`, background: colorByValue(stat.value)}}></div>
                    </div>
                )}
            </div>
        </div>
    );

};