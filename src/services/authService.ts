
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';
import { errorMessage } from '../types/response';

const prisma = new PrismaClient();

type registerUserProps = {
    email: string,
    password: string,
    firstName: string,
    lastName: string, 
    address: string,
    phoneNumber: string,
    role: number
}

type loginUserProps = {
    email: string,
    password: string
}

export const registerUser = async (props: registerUserProps) => {
    try {
        const {email, password, firstName, lastName, address, phoneNumber, role } = props;
        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })
        console.log('user from db is ', user);
        
        if(user!==null) {
            console.log(user);
            return new errorMessage({statusCode:401, message:'user already exist in database'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Before create user call to db');
        return prisma.user.create({
            data:{
                email, firstName, lastName, address, password: hashedPassword, phone: phoneNumber, role: { connect: { roleId: role } }
            }
        })
        console.log('After create user call to db');
        
    } catch (error) {
        console.log(error);
        
    }
} 

export const loginUser = async (props: loginUserProps) => {
    const {email, password} = props;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid email or password");
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");
  
    const token = jwt.sign({ id: user.userId, roleId: user.roleId }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    return { user, token };
  };
  