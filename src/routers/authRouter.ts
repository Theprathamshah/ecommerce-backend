import { Router } from "express";
import { registerUser, loginUser } from "../services/authService";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const {email, password, firstName, lastName, phone, address,role} = req.body;
    const user = await registerUser({email,firstName, lastName, address, phoneNumber:phone, password, role});
    console.log(email);
    res.json(user);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
const data = await loginUser({ email: req.body.email, password: req.body.password });
res.json(data);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
