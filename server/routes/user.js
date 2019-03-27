const {express} = require('../helpers/require'),
controllerUser = require('../controllers/user'),
router = express.Router()

router.post('/register', controllerUser.registerUser)

router.post('/login', controllerUser.loginUser)

module.exports = router