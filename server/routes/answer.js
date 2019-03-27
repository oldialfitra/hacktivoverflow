const {express} = require('../helpers/require'),
controllerAnswer = require('../controllers/answer'),
router = express.Router(),
auth = require('../middleware/authentification')

router.use('', auth)

router.get('/', controllerAnswer.getAllAnswer)

router.get('/:id', controllerAnswer.getOneAnswer)

router.post('/:id', controllerAnswer.createAnswer)

router.put('/:id', controllerAnswer.updateAnswer)

router.delete('/:id', controllerAnswer.deleteAnswer)

router.put('/upvote/:id', controllerAnswer.upvotePost)

router.put('/downvote/:id', controllerAnswer.downvotePost)

module.exports = router