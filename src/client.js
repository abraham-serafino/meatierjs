import browserExpress from 'browser-express';

import app from './routes/app';

const router = browserExpress({
  interceptLinks: true,
  interceptFormSubmit: true,
  document,
  window
});

app(router);

router.listen(() => {});
router.navigate('/');
