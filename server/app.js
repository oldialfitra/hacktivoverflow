const { express, cors, mongoose } = require('./helpers/require'),
    app = express(),
    port = process.env.PORT || 5000,
    routerUser = require('./routes/user'),
    routerQuestion = require('./routes/question'),
    routerAnswer = require('./routes/answer')
mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/users', routerUser)

app.use('/questions', routerQuestion)

app.use('/answers', routerAnswer)

app.listen(port, function () {
    console.log('Listening on port', port)
})