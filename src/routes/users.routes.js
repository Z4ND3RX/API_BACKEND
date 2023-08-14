import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

router.get('/users/:id', async (req, res) => {
    const userFound = await prisma.user.findFirst({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (!userFound) return res.status(404).json({ error: "User not found" });
    return res.json(userFound);
})

router.post('/users', async (req, res) => {
    const newUser = await prisma.user.create({
        data: req.body,
    })
    res.json(newUser);
})

router.delete('/users/:id', async (req, res) => {
    const userDeleted = await prisma.user.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if (!userDeleted) return res.status(404).json({ error: "User not found" });
    return res.json(userDeleted);
});

router.put('/users/:id', async (req, res) => {
    const userUpdated = await prisma.user.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: req.body,
    });
    return res.json(userUpdated);
})

export default router;