const {express} = require('../helpers/require'),
controllerQuestion = require('../controllers/question'),
router = express.Router(),
auth = require('../middleware/authentification')

router.get('/', controllerQuestion.getAllPost)

router.use('', auth)

router.get('/:id', controllerQuestion.getOnePost)

router.post('/', controllerQuestion.postQuestion)

router.put('/:id', controllerQuestion.updatePost)

router.delete('/:id', controllerQuestion.deletePost)

router.put('/upvote/:id', controllerQuestion.upvotePost)

router.put('/downvote/:id', controllerQuestion.downvotePost)

module.exports = router