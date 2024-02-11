import { Box } from '@mantine/core';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

import styles from './RouteTransition.module.css';

const variants: Variants = {
  initial: {
    opacity: 0,
    // transform: 'translate3d(-100%, 0, 0)',
    transform: 'scale3d(1.1, 1.1, 1.1)',
  },
  animate: {
    opacity: 1,
    // transform: 'translate3d(0, 0, 0)',
    transform: 'scale3d(1, 1, 1)',

    transition: {
      duration: 1,
      // ease: 'easeInOut',
    },
    transitionEnd: {
      transform: 'none', // Remove transform to fix children's absolute/fixed positioning
    },
  },
  exit: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,

    opacity: 0,
    // transform: 'scale3d(0.5, 0.5, 0.5)',
    // transform: 'translate3d(-50px, 50px, 0)',
    transform: 'scale3d(0.9, 0.9, 0.9)',
    transition: {
      duration: 0.3,
      // ease: 'easeInOut',
    },
  },
};

// const AnimatedOutlet = () => {
//   const o = useOutlet();
//   const [outlet] = useState(o);
//   return <>{outlet}</>;
// };

export const RouteTransition = () => {
  const outlet = useOutlet();
  const location = useLocation();

  return (
    <Box className={styles.container}>
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.item}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};
