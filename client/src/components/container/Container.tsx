import styles from './Container.module.scss';
import type { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
};

function Container({ children }: ContainerProps){
    return (
        <div className={styles.container}>
            {children}
        </div>

    );
};

export default Container;