import browserExpress from 'browser-express';
import md5 from 'md5';

import app from './routes/app';

localStorage.setItem(`NoBS.username`, `admin`);
localStorage.setItem(`NoBS.password`, md5(`password`));

const router = browserExpress({
  interceptLinks: true,
  interceptFormSubmit: true,
  document,
  window
});

app(router);

router.listen(() => {});
router.navigate(`/`);
