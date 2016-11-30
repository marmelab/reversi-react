import express from 'express';
import path from 'path';
import AppMiddleware from './middleware/app';
import ApiMiddleware from './middleware/api';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/public', express.static(path.join(__dirname, '../../public')));
app.use('/api', ApiMiddleware);
app.use(AppMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}.`);
});
