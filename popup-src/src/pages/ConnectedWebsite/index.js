import React, {useState} from 'react';
import classNames from "classnames";

import Header from "Root/components/Header";
import PageTitle from "Root/components/PageTitle";

import styles from "./styles.less";

let websites = [
    {name: 'Lumenswap.io', link: '/'},
    {name: 'Stellarterm.com', link: '/'},
    {name: 'Litemint.com', link: '/'},
];

const ConnectedWebsite = () => {
    const [data, setData] = useState(websites);

    const remove = (index) => {
        const filteredData = [...data];
        const result = filteredData.filter((web, i) => i !== index);
        setData(result);
    }

    return (
        <div>
            <Header />
            <PageTitle title="Connected website" />
            <div className="content">
                <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod the tempore </p>
                <div>
                    {data.map((web, index) => (
                        <div key={index} className={styles.website}>
                            <a href={web.link} target="_blank" rel="noreferrer" className={styles.link}>{web.name}</a>
                            <span className={classNames("icon-multiply", styles.icon)} onClick={() => remove(index)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConnectedWebsite;