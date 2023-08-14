import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany()
    res.json(posts)
})

router.get('/posts/:id', async (req, res) => {
    const postFound = await prisma.post.findFirst({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (!postFound) return res.status(404).json({ error: "Post not found" });
    return res.json(postFound);
})

router.post('/posts', async (req, res) => {
    const newPost = await prisma.post.create({
        data: req.body,
    })
    res.json(newPost);
})

router.delete('/posts/:id', async (req, res) => {
    const postDeleted = await prisma.post.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if (!postDeleted) return res.status(404).json({ error: "Post not found" });
    return res.json(postDeleted);
});

router.put('/posts/:id', async (req, res) => {
    const postUpdated = await prisma.post.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: req.body,
    });
    return res.json(postUpdated);
})

export default router;