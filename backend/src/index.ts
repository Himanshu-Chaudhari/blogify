import { Hono } from 'hono';
import { userRouter } from './routes/userRoutes';
import { blogRouter } from './routes/blogRoutes';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings:{
    DATABASE_URL : string
    JWT_SECRET : string
  },
  Variables:{
    userId : number
  }
}>();
app.use('*',cors())
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)

app.get('/quotes',async (c)=>{
  try {
      const response = await fetch('http://api.viewbits.com/v1/zenquotes?mode=batch');
      const data : any = await response.json();
      return c.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      c.json({ error: 'Failed to fetch data' });
    }
  
})

export default app
