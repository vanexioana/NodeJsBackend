const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const sequelize = require('./sequelize').sequelize
const FavouriteList = require("./models/FavouriteLists")
const Video = require("./models/Video")
const {Op} = require("sequelize");

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())

app.get('/video', async (req, res) => {
    try {
        const videoList = await Video.findAll()
        res.status(200).json(videoList)
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'internal server error'})
    }
})

app.get('/video/:vid', async (req, res) => {
    try {
        const video = await Video.findByPk(req.params.vid)
        if (video) {
            res.status(200).json(video)
        } else {
            res.status(404).json({message: 'not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.post('/video', async (req, res) => {
    try {
        const video = req.body
        await Video.create(video)
        res.status(201).json({message: 'created'})

    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.put('/video/:vid', async (req, res) => {
    try {
        const video = await Video.findByPk(req.params.vid)
        if (video) {
            await video.update(req.body, {
                fields: ['description', 'title', 'url']
            })
            res.status(202).json({message: 'accepted'})
        } else {
            res.status(404).json({message: 'not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.delete('/video', async (req, res) => {
    try {
        const favouriteList = await FavouriteList.findByPk(req.params.vid)
        if (favouriteList) {
            await favouriteList.destroy()
            res.status(202).json({message: 'accepted'})
        } else {
            res.status(404).json({message: 'not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.get("/favouriteList", async (req, res) => {
    try {
        const {description, date, sortByDate,page} = req.query
        const pageSize = 5
        const currentOffset = page? (page+1)*pageSize:0

        const favouriteList = await FavouriteList.findAll({
            where: {
                [Op.or]: [
                    description ? {description: {[Op.like]: description}} : undefined,
                    date ? {date: {[Op.eq]: date}} : undefined
                ]
            },
            order: sortByDate ? [[sortByDate, "ASC"]] : undefined,
            limit: 5,
            offset: currentOffset
        })


        res.status(200).json(favouriteList)
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'internal server error'})
    }
})

app.get("/favouriteList/:lid/video", async (req, res) => {
    try {
        const list = await FavouriteList.findByPk(req.params.lid)
        if (list) {
            const video = await list.getVideos()
            res.status(200).json(video)
        } else {
            res.status(404).json({message: 'not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.get('/favouriteList/:lid/video/:vid', async (req, res) => {
    try {
        const favouriteList = await FavouriteList.findByPk(req.params.lid)
        if (favouriteList) {
            const videos = await favouriteList.getVideos({
                where: {
                    id: req.params.cid
                }
            })
            const video = videos.shift()
            if (video) {
                res.status(200).json(video)
            } else {
                res.status(404).json({message: 'chapter not found'})
            }
        } else {
            res.status(404).json({message: 'book not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.post('/favouriteList/:lid/video/:vid', async (req, res) => {
    try {
        const list = await FavouriteList.findByPk(req.params.lid)
        if (list) {
            const video = req.body
            video.listId = list.id
            await Video.create(video)
            res.status(200).json({message: 'created'})
        } else {
            res.status(404).json({message: 'not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.put('/favouriteList/:lid/video/:vid', async (req, res) => {
    try {
        const list = await FavouriteList.findByPk(req.params.vid)
        if (list) {
            const videos = await list.getVideos({
                where: {
                    id: req.params.vid
                }
            })
            const video = videos.shift()
            if (video) {
                await video.update(req.body)
                res.status(202).json({message: 'accepted'})
            } else {
                res.status(404).json({message: 'chapter not found'})
            }
        } else {
            res.status(404).json({message: 'book not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.delete('/favouriteList/:lid/video/:vid', async (req, res) => {
    try {
        const list = await FavouriteList.findByPk(req.params.vid)
        if (list) {
            const videos = await list.getVideos({
                where: {
                    id: req.params.vid
                }
            })
            const video = videos.shift()
            if (video) {
                await video.destroy()
                res.status(202).json({message: 'accepted'})
            } else {
                res.status(404).json({message: 'chapter not found'})
            }
        } else {
            res.status(404).json({message: 'book not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})


app.listen(process.env.PORT, async () => {
    await sequelize.sync({alter: true})
})