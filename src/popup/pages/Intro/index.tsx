import React from 'react';
import { useNavigate } from 'react-router-dom';

import intro1 from '../../../assets/images/intro1.png';
import Button from '../../components/common/Button';
import * as route from '../../staticRes/routes';
import Layout1 from '../../components/Layout1';

import styles from './styles.less';

const Intro = () => {
  const navigate = useNavigate();

  return (
    <Layout1 isDashboard={false}>
      <img src={intro1} alt="img" className={styles.img} />

      <div className={styles.container}>
        <div className="text-center">
          <p className="lg:text-xl md:text-xl text-lg text-primary-dark ">For example some text would be here</p>
          <p className="lg:text-5xl md:text-4xl text-3xl text-primary-darkest font-bold mt-4 mb-12 ">Make Rabet your own</p>
        </div>

        <Button
          className={styles.mbButton}
          type="button"
          variant="primary"
          size="medium"
          content="Get Start"
          style={{ marginBottom: '28px' }}
          onClick={() => {
            navigate(route.createWalletPage);
          }}
        />

      </div>
    </Layout1>
  );
};

export default Intro;
