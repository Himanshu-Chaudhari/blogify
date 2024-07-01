import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {sign } from 'hono/jwt';
import {userSignupSchema,userSigninSchema} from '@himanshuchaudhari/mediumwebsite-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
      userId : number
    }
}>();

userRouter.post('/signup',async (c)=>{
    console.log('i was here')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body=await c.req.json();
    try{
      userSignupSchema.parse(body)
    }catch(err){
      return c.json({err})
    }
  
    try{
        const user= await prisma.user.create({
            data: {
            email : body.email,
            name : body.name,
            password : body.password
            }
        })
        const token =await sign({ id :user.id } , c.env.JWT_SECRET)
        c.status(200)
        return c.json({'message' : 'User created','token':token})
    }catch(err){
      c.status(500)
      return c.json({'message' : JSON.stringify(err)})
    }
})
  
userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body =await c.req.json()
    const password=c.req.header('password');
    const email=c.req.header('email');
    if(!email || !password){
        c.status(404)
        return c.json({'message' : 'Invalid Input'})
    }
    try{
      userSigninSchema.parse(body)
      const user=await prisma.user.findUnique({
        where:{
          password : body.password,
          email : body.email
        }
    })
    if(!user){
        return c.json({'message' : 'No user found'})
    }
        const token =await sign({id :user.id},c.env.JWT_SECRET)
        c.status(200)
        return c.json({'message' : 'User found','token':token})
    }catch(error: any){
        c.status(500)
        return c.json({error})
    }finally{
        await prisma.$disconnect()
    }
})
  