import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt';
import {createPostInput,updatePostInput} from '@himanshuchaudhari/mediumwebsite-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
      userId : number
    }
}>();
  
blogRouter.use('/*',async(c,next)=>{
    const authHeader=c.req.header('Authorization');
    if(!authHeader){
        c.status(401);
        return c.json({
            'message' : "unauthorised"
        })
    }
    const token = authHeader.split(' ')[1];
    try{
        const payload = await verify(token, c.env.JWT_SECRET);
        // @ts-ignore
        c.set('userId',payload.id);
    }catch(error){
        c.status(411)
        return c.json({"error" : error})
    }
    await next();
})

blogRouter.delete('/:id',async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        await prisma.post.delete({
            where :{
                id : c.req.param('id')
            }
        })
        return c.json({
            "message" : "Blog deleted"
        });
    }catch(error){
        return c.json({
            error : error
        });
    }finally {
        await prisma.$disconnect();
    }
})
  
blogRouter.post('/',async (c)=>{
    const prisma= new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const body = await c.req.json()
        createPostInput.parse(body)
        // @ts-ignore
        const userid = c.get('userId')
        console.log("This is userid" , userid)
        const blog = await prisma.post.create({
            data:{  
                title : body.title,
                content : body.content,
                // @ts-ignore
                author_id : userid
            }
        })
        return c.json({'message': 'Post Created' , 'blog id':blog.id})
    }
    catch(error: any){
        c.status(error.status)
        console.log(error)
        c.json({'message':error})
    }finally{
        await prisma.$disconnect()
    }
  
  })
  
blogRouter.put('/',async (c)=>{
    const prisma= new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const body = await c.req.json()
        updatePostInput.parse(body)
        const userid = c.get('userId')
        const blog = await prisma.post.update({
            where: {
                id: body.id ,
                // @ts-ignore
                author_id : userid
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        c.status(200)
        return c.json({'message': 'Post Upated' , 'Blog':blog})
    }
    catch(error : any){
        c.status(error.status)
        return c.json({'message' : error})
    }finally{
        await prisma.$disconnect()
    }
})

blogRouter.get('/bulk/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    console.log('I was here')
    try {
        const blogs = await prisma.post.findMany({
            select:{
                content :true,
                title : true,
                id : true,
                author : {
                    select:{
                        name : true
                    }
                },
                created : true
            }
        });
        return c.json({'Blogs':blogs});
    } catch (error: any) {
        console.error('Error fetching blogs:', error);
        c.status(500);
        return c.json({ message: 'An error occurred while fetching blogs.', error: error.message });
    } finally {
        await prisma.$disconnect();
    }
});


blogRouter.get('/myBlogs/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    console.log('I was here')
    const userId=c.get('userId') ;
    console.log
    try {
        const blogs = await prisma.post.findMany({
            where:{
                // @ts-ignore
                author_id :c.get('userId') 
            },
            select:{
                content :true,
                title : true,
                id : true,
                author : {
                    select:{
                        name : true
                    }
                },
                created : true
            }
        });
        return c.json({'Blogs':blogs});
    } catch (error: any) {
        console.error('Error fetching blogs:', error);
        c.status(500);
        return c.json({ message: 'An error occurred while fetching blogs.', error: error.message });
    } finally {
        await prisma.$disconnect();
    }
});


blogRouter.get('/:id',async (c)=>{
    const prisma= new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog= await prisma.post.findFirst({
            where:{
            id:c.req.param('id')
            },
            select:{
                content :true,
                title : true,
                id : true,
                author : {
                    select:{
                        name : true
                    }
                },
            }
        })
        return c.json({"blog": blog});
    }
    catch(error:any){
        c.status(error.status())
        return c.text(error)
    }
})
