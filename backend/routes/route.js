import {getCarros} from '../server';

const route = express.Router();

route.get('/cars', getCarros);